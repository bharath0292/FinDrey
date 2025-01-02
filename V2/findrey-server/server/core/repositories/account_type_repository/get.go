package account_type_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/account_type_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAllAccountType() ([]entity.AccountType, int64, error) {
	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).CountDocuments(context.TODO(), bson.D{{}})
	if err != nil {
		return nil, 0, err
	}

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.AccountTypes.String()).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var accountTypes []entity.AccountType
	if err = cursor.All(context.TODO(), &accountTypes); err != nil {
		return nil, 0, err
	}

	return accountTypes, totalCount, nil
}
