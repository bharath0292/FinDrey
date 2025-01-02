package user_repository

import (
	"context"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/entities/user_entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateUser(userID primitive.ObjectID, updatedUser user_entity.User) (user_entity.User, error) {
	var mongoClient, database = adapters.GetMongoClient()
	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Users.String()).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return user_entity.User{}, err
	}
	defer cursor.Close(context.TODO())

	updateData := bson.M{
		"$set": bson.M{
			"username":  updatedUser.Username,
			"email":     updatedUser.Email,
			"password":  updatedUser.Password,
			"role":      updatedUser.Role,
			"image":     updatedUser.Image,
			"updatedAt": updatedUser.UpdatedAt,
		},
	}

	_, err = mongoClient.Database(database).Collection(mongo_enums.Users.String()).UpdateOne(
		context.TODO(),
		bson.M{"_id": userID},
		updateData,
	)
	if err != nil {
		return user_entity.User{}, err
	}

	return updatedUser, nil
}
