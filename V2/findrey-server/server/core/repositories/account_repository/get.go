package account_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/account_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllActiveAccounts(userID primitive.ObjectID) ([]entity.Account, int64, error) {

	filter := bson.M{"userId": userID, "deletedAccount": false}
	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).CountDocuments(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).Find(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var accounts []entity.Account
	if err = cursor.All(context.TODO(), &accounts); err != nil {
		return nil, 0, err
	}

	return accounts, totalCount, nil
}

func GetAccountByID(id primitive.ObjectID) (entity.Account, error) {
	var account entity.Account

	var mongoClient, database = adapters.GetMongoClient()
	err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).FindOne(context.TODO(), bson.M{"_id": id, "deletedAccount": false}).Decode(&account)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return entity.Account{}, nil
		}
		return entity.Account{}, err
	}

	return account, nil
}

func GetFilteredAccounts(userID primitive.ObjectID, page int, noOfItemsInPage int, sortBy string,
	sortOrder string, search string) ([]entity.Account, int64, error) {

	filter := bson.M{"userId": userID, "deletedAccount": false}
	if search != "" {
		filter["$or"] = []bson.M{
			{"bankName": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"accountNumber": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"accountName": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
		}
	}

	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).CountDocuments(context.TODO(), filter)
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

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).Find(context.TODO(), filter, findOptions)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var accounts []entity.Account
	err = cursor.All(context.TODO(), &accounts)
	if err != nil {
		return nil, 0, err
	}

	return accounts, totalCount, nil
}
