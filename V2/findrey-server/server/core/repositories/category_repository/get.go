package category_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/category_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var allUserObjectID, _ = primitive.ObjectIDFromHex("671b39ae7ff9f9582261684b") //id of All user

func GetAllActiveCategories(userId primitive.ObjectID) ([]entity.Category, int64, error) {
	var mongoClient, database = adapters.GetMongoClient()

	filter := bson.M{
		"deletedCategory": false,
		"$or": []bson.M{
			{"userId": allUserObjectID},
			{"userId": userId},
		},
	}
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).CountDocuments(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).Find(context.TODO(), filter)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var categories []entity.Category
	if err = cursor.All(context.TODO(), &categories); err != nil {
		return nil, 0, err
	}

	return categories, totalCount, nil
}

func GetCategoryByID(id primitive.ObjectID) (entity.Category, error) {
	var category entity.Category

	var mongoClient, database = adapters.GetMongoClient()
	err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).FindOne(context.TODO(), bson.M{"_id": id, "deletedCategory": false, "userId": allUserObjectID}).Decode(&category)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return entity.Category{}, nil
		}
		return entity.Category{}, err
	}

	return category, nil
}

func GetFilteredCategories(userId primitive.ObjectID, page int, noOfItemsInPage int, sortBy string,
	sortOrder string, search string) ([]entity.Category, int64, error) {

	filter := bson.M{
		"deletedCategory": false,
		"$or": []bson.M{
			{"userId": allUserObjectID},
			{"userId": userId},
		},
	}

	if search != "" {
		filter["$or"] = []bson.M{
			{"category": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
			{"transactionType": bson.M{mongo_enums.REGEX: search, mongo_enums.OPTIONS: "i"}},
		}
	}

	var mongoClient, database = adapters.GetMongoClient()
	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).CountDocuments(context.TODO(), filter)
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

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Categories.String()).Find(context.TODO(), filter, findOptions)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var categories []entity.Category
	err = cursor.All(context.TODO(), &categories)
	if err != nil {
		return nil, 0, err
	}

	return categories, totalCount, nil
}
