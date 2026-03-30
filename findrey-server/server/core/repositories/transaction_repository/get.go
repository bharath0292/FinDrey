package transaction_repository

import (
	"context"
	"strconv"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/transaction_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var transactionsCollection string = mongo_enums.Transactions.String()

func GetAllTransactions(userId primitive.ObjectID) ([]entity.Transaction, int64, error) {

	var mongoClient, database = adapters.GetMongoClient()

	filter := bson.M{"userId": userId}
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).CountDocuments(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	cursor, err := mongoClient.Database(database).Collection(transactionsCollection).Find(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var transactions []entity.Transaction
	if err = cursor.All(context.TODO(), &transactions); err != nil {
		return nil, 0, err
	}

	return transactions, totalCount, nil
}

func GetFilteredTransactions(userID primitive.ObjectID, page int, noOfItemsInPage int, sortBy string,
	sortOrder string, search string) ([]entity.Transaction, int64, error) {
	var numericSearch *float64

	filter := bson.M{}
	filter["userId"] = userID

	if search != "" {

		if num, err := strconv.ParseFloat(search, 64); err == nil {
			numericSearch = &num
		}

		orConditions := []bson.M{
			{"description": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"debitAccount": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"creditAccount": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"category": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"transactionType": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"subTransactionType": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
		}

		if numericSearch != nil {
			orConditions = append(orConditions, bson.M{"amount": *numericSearch})
		}

		filter["$or"] = orConditions
	}

	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).CountDocuments(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	skip := (page - 1) * noOfItemsInPage
	limit := int64(noOfItemsInPage)

	sortDirection := 1
	if sortOrder == "desc" {
		sortDirection = -1
	}

	if sortBy == "" {
		sortBy = "_id"
	}

	sortOptions := bson.D{{Key: sortBy, Value: sortDirection}}

	findOptions := options.Find()
	findOptions.SetSort(sortOptions)
	findOptions.SetSkip(int64(skip))
	findOptions.SetLimit(limit)

	cursor, err := mongoClient.Database(database).Collection(transactionsCollection).Find(context.TODO(), filter, findOptions)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var transactions []entity.Transaction
	err = cursor.All(context.TODO(), &transactions)
	if err != nil {
		return nil, 0, err
	}

	return transactions, totalCount, nil
}

func GetTransactionByID(id primitive.ObjectID) (entity.Transaction, error) {
	var transaction entity.Transaction

	var mongoClient, database = adapters.GetMongoClient()
	err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).FindOne(context.TODO(), bson.M{"_id": id}).Decode(&transaction)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return entity.Transaction{}, nil
		}
		return entity.Transaction{}, err
	}

	return transaction, nil
}

func GetFilteredDescriptions(userID primitive.ObjectID, search string) ([]string, error) {
	filter := bson.M{"userId": userID}
	if search != "" {
		filter["description"] = bson.M{
			mongo_enums.REGEX:   search,
			mongo_enums.OPTIONS: "i",
		}
	}

	var mongoClient, database = adapters.GetMongoClient()

	// Aggregation pipeline for unique descriptions
	pipeline := []bson.M{
		{"$match": filter},
		{"$group": bson.M{
			"_id": "$description",
		}},
		{"$sort": bson.M{"_id": 1}},
		{"$limit": 50},
	}

	cursor, err := mongoClient.Database(database).
		Collection(mongo_enums.Transactions.String()).
		Aggregate(context.TODO(), pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var results []bson.M
	err = cursor.All(context.TODO(), &results)
	if err != nil {
		return nil, err
	}

	// Extract unique descriptions
	descriptions := make([]string, 0, len(results))
	for _, result := range results {
		if desc, ok := result["_id"].(string); ok {
			descriptions = append(descriptions, desc)
		}
	}

	if err != nil {
		return nil, err
	}

	return descriptions, nil
}
