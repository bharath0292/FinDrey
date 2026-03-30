package category_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/entities/category_entity"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateCategory(id primitive.ObjectID, updatedCategory category_entity.Category) (category_entity.Category, error) {
	var mongoClient, database = adapters.GetMongoClient()

	updateData := bson.M{
		"$set": bson.M{
			"category":        updatedCategory.Category,
			"transactionType": updatedCategory.TransactionType,
			"updatedAt":       updatedCategory.UpdatedAt,
		},
	}

	filter := bson.M{"_id": id, "deletedCategory": false}

	_, err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).UpdateOne(
		context.TODO(),
		filter,
		updateData,
	)
	if err != nil {
		return category_entity.Category{}, err
	}

	return updatedCategory, nil

}
