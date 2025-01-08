package sub_transaction_type_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	entity "github.com/bharath0292/findrey-server/server/core/entities/sub_transaction_type_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllSubTransactionType() ([]entity.SubTransactionType, int64, error) {
	var mongoClient, database = adapters.GetMongoClient()

	totalCount, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).CountDocuments(context.TODO(), bson.D{{}})
	if err != nil {
		return nil, 0, err
	}

	sortOptions := bson.D{{Key: "subTransactionType", Value: 1}}

	findOptions := options.Find()
	findOptions.SetSort(sortOptions)

	cursor, err := mongoClient.Database(database).Collection(mongo_enums.SubTransactionTypes.String()).Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(context.TODO())

	var subTransactionTypes []entity.SubTransactionType
	if err = cursor.All(context.TODO(), &subTransactionTypes); err != nil {
		return nil, 0, err
	}

	return subTransactionTypes, totalCount, nil
}
