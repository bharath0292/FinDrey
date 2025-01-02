package transaction_dto

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TransactionRequestDTO struct {
	ID primitive.ObjectID `json:"id" binding:"required"`
}

type CreateTransactionRequestDTO struct {
	UserID             primitive.ObjectID  `json:"userID" binding:"required"`
	TransactionDate    time.Time           `json:"transactionDate" binding:"required" time_format:"2006-01-02T15:04:50"`
	TransactionType    primitive.ObjectID  `json:"transactionType" binding:"required"`
	SubTransactionType *primitive.ObjectID `json:"subTransactionType" binding:"omitempty"`
	DebitAccount       *primitive.ObjectID `json:"debitAccount" binding:"omitempty"`
	CreditAccount      *primitive.ObjectID `json:"creditAccount" binding:"omitempty"`
	Category           *primitive.ObjectID `json:"category" binding:"omitempty"`
	Description        string              `json:"description" binding:"required"`
	Amount             float64             `json:"amount" binding:"required,numeric"`
}

type UpdateTransactionRequestDTO struct {
	ID                 primitive.ObjectID  `json:"id" binding:"required"`
	TransactionDate    time.Time           `json:"transactionDate" binding:"required" time_format:"2006-01-02T15:04:50"`
	TransactionType    primitive.ObjectID  `json:"transactionType" binding:"required"`
	SubTransactionType *primitive.ObjectID `json:"subTransactionType" binding:"omitempty"`
	DebitAccount       *primitive.ObjectID `json:"debitAccount" binding:"omitempty"`
	CreditAccount      *primitive.ObjectID `json:"creditAccount" binding:"omitempty"`
	Category           *primitive.ObjectID `json:"category" binding:"omitempty"`
	Description        string              `json:"description" binding:"required"`
	Amount             float64             `json:"amount" binding:"required,numeric"`
}
