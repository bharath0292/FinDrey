package transaction_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/entities/transaction_entity"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateTransaction(id primitive.ObjectID, updatedTransaction transaction_entity.Transaction) (transaction_entity.Transaction, error) {
	var mongoClient, database = adapters.GetMongoClient()

	updateData := bson.M{
		"$set": bson.M{
			"transactionDate":    updatedTransaction.TransactionDate,
			"transactionType":    updatedTransaction.TransactionType,
			"subTransactionType": updatedTransaction.SubTransactionType,
			"creditAccount":      updatedTransaction.CreditAccount,
			"debitAccount":       updatedTransaction.DebitAccount,
			"category":           updatedTransaction.Category,
			"description":        updatedTransaction.Description,
			"amount":             updatedTransaction.Amount,
			"updatedAt":          updatedTransaction.UpdatedAt,
		},
	}

	filter := bson.M{"_id": id}

	_, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).UpdateOne(
		context.TODO(),
		filter,
		updateData,
	)
	if err != nil {
		return transaction_entity.Transaction{}, err
	}

	return updatedTransaction, nil

}
