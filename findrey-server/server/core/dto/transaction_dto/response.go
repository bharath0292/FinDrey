package transaction_dto

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TransactionResponseDTO struct {
	ID                 primitive.ObjectID `json:"id"`
	UserID             primitive.ObjectID `json:"userId"`
	TransactionDate    time.Time          `json:"transactionDate"`
	TransactionType    primitive.ObjectID `json:"transactionType"`
	SubTransactionType primitive.ObjectID `json:"subTransactionType,omitempty"`
	DebitAccount       primitive.ObjectID `json:"debitAccount"`
	CreditAccount      primitive.ObjectID `json:"creditAccount,omitempty"`
	Category           primitive.ObjectID `json:"category"`
	Description        string             `json:"description"`
	Amount             float64            `json:"amount"`
	CreatedAt          time.Time          `json:"createdAt"`
	UpdatedAt          time.Time          `json:"updatedAt"`
}
