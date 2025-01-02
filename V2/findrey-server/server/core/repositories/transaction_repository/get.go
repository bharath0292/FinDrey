package transaction_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/transaction_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var transactionsCollection string = mongo_enums.Transactions.String()

func GetAllTransactions() ([]entity.Transaction, int64, error) {

	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).CountDocuments(context.TODO(), bson.D{{}})
	if err != nil {
		return nil, 0, err
	}
	cursor, err := mongoClient.Database(database).Collection(transactionsCollection).Find(context.TODO(), bson.D{{}})
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

	filter := bson.M{}
	filter["userId"] = userID
	if search != "" {
		filter["$or"] = []bson.M{
			{"description": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"debitAccount": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"creditAccount": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"category": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"transactionType": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"subTransactionType": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
		}
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

func GetFilteredDescriptions(userID primitive.ObjectID, page int, noOfItemsInPage int, search string) ([]entity.Transaction, int64, error) {

	filter := bson.M{}
	filter["userId"] = userID
	if search != "" {
		filter["$or"] = []bson.M{
			{"description": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
		}
	}

	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).CountDocuments(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	skip := (page - 1) * noOfItemsInPage
	limit := int64(noOfItemsInPage)

	findOptions := options.Find()
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
