package user_repository

import (
	"context"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func DeleteUser(userID primitive.ObjectID) error {
	var mongoClient, database = adapters.GetMongoClient()

	_, err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).DeleteOne(context.TODO(), bson.M{"_id": userID})

	if err != nil {
		return err
	}

	return nil
}
