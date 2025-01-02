package category_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/category_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateCategory(category entity.Category) (entity.Category, error) {
	var mongoClient, database = adapters.GetMongoClient()
	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return entity.Category{}, err
	}
	defer cursor.Close(context.TODO())

	createdCategory, err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).InsertOne(context.TODO(), category)
	if err != nil {
		return entity.Category{}, err
	}

	category.ID = createdCategory.InsertedID.(primitive.ObjectID)
	return category, nil
}
