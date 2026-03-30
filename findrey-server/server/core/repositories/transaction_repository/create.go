package transaction_repository

import (
	"context"
	"time"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/dto/transaction_dto"
	entity "github.com/bharath0292/findrey-server/server/core/entities/transaction_entity"
	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateTransaction(transaction transaction_dto.CreateTransactionRequestDTO) (entity.Transaction, error) {
	var mongoClient, database = adapters.GetMongoClient()
	cursor, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).Find(context.TODO(), bson.D{{}})
	if err != nil {
		return entity.Transaction{}, err
	}
	defer cursor.Close(context.TODO())

	newTransaction := entity.Transaction{
		UserID:             transaction.UserID,
		TransactionDate:    transaction.TransactionDate,
		TransactionType:    transaction.TransactionType,
		SubTransactionType: *transaction.SubTransactionType,
		DebitAccount:       *transaction.DebitAccount,
		CreditAccount:      *transaction.CreditAccount,
		Category:           *transaction.Category,
		Description:        transaction.Description,
		Amount:             transaction.Amount,
		CreatedAt:          time.Now(),
		UpdatedAt:          time.Now(),
	}

	result, err := mongoClient.Database(database).Collection(mongo_enums.Transactions.String()).InsertOne(context.TODO(), newTransaction)
	if err != nil {
		return entity.Transaction{}, err
	}

	newTransaction.ID = result.InsertedID.(primitive.ObjectID)

	return newTransaction, nil
}
