package user_repository

import (
	"context"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/entities/user_entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetAllUsers() ([]user_entity.User, int64, error) {
	var mongoClient, database = adapters.GetMongoClient()

	filter := bson.D{
		{Key: "username", Value: bson.D{{Key: "$ne", Value: "All"}}},
	}
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.TransactionTypes.String()).CountDocuments(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).Find(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var users []user_entity.User
	if err = cursor.All(context.TODO(), &users); err != nil {
		return nil, 0, err
	}

	return users, totalCount, nil
}

func GetUserById(id primitive.ObjectID) (user_entity.User, error) {
	var user user_entity.User

	filter := bson.D{
		{Key: "username", Value: bson.D{{Key: "$ne", Value: "All"}}},
		{Key: "_id", Value: id},
	}

	var mongoClient, database = adapters.GetMongoClient()
	err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).FindOne(
		context.TODO(),
		filter,
	).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return user_entity.User{}, nil
		}
		return user_entity.User{}, err
	}

	return user, nil
}

func GetUserByEmail(email string) (user_entity.User, error) {
	var user user_entity.User

	filter := bson.D{
		{Key: "username", Value: bson.D{{Key: "$ne", Value: "All"}}},
		{Key: "email", Value: email},
	}

	var mongoClient, database = adapters.GetMongoClient()
	err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).FindOne(
		context.TODO(),
		filter,
	).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return user_entity.User{}, nil
		}
		return user_entity.User{}, err
	}

	return user, nil
}
