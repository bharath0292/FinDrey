package account_repository

import (
	"context"
	"time"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteAccount(accountId primitive.ObjectID) error {
	var mongoClient, database = adapters.GetMongoClient()

	filter := bson.M{"_id": accountId, "deletedAccount": false}
	update := bson.M{
		"$set": bson.M{
			"deletedAccount": true,
			"deletedDate":    time.Now(),
		},
	}

	_, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	return nil
}
