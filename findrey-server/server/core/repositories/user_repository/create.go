package user_repository

import (
	"context"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/entities/user_entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateUser(newUser user_entity.User) (user_entity.User, error) {
	var mongoClient, database = adapters.GetMongoClient()
	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return user_entity.User{}, err
	}
	defer cursor.Close(context.TODO())

	result, err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).InsertOne(context.TODO(), newUser)
	if err != nil {
		return user_entity.User{}, err
	}

	newUser.ID = result.InsertedID.(primitive.ObjectID)

	return newUser, nil
}
