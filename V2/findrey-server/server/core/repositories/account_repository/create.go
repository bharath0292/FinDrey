package account_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/account_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateAccount(account entity.Account) (entity.Account, error) {
	var mongoClient, database = adapters.GetMongoClient()
	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return entity.Account{}, err
	}
	defer cursor.Close(context.TODO())

	createdAccount, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).InsertOne(context.TODO(), account)
	if err != nil {
		return entity.Account{}, err
	}

	account.ID = createdAccount.InsertedID.(primitive.ObjectID)
	return account, nil
}
