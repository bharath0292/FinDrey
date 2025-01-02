package transaction_repository

import (
	"context"
	"fmt"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func DeleteTransaction(transactionId primitive.ObjectID) error {
	mongoClient, database := adapters.GetMongoClient()

	filter := bson.M{"_id": transactionId}

	_, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).DeleteOne(context.TODO(), filter)
	if err != nil {
		return fmt.Errorf("failed to delete transaction with ID %s: %w", transactionId.Hex(), err)
	}

	return nil
}
