package account_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AccountRequestDTO struct {
	ID primitive.ObjectID `json:"id" binding:"required"`
}

type CreateAccountRequestDTO struct {
	UserID        primitive.ObjectID `json:"userId" binding:"required"`
	BankName      string             `json:"bankName"`
	AccountNumber string             `json:"accountNumber"`
	AccountName   string             `json:"accountName"`
	AccountType   primitive.ObjectID `json:"accountType"`
	Balance       float64            `json:"balance"`
}

type UpdateAccountRequestDTO struct {
	ID            primitive.ObjectID  `json:"id" binding:"required"`
	BankName      *string             `json:"bankName"`
	AccountNumber *string             `json:"accountNumber"`
	AccountName   *string             `json:"accountName"`
	AccountType   *primitive.ObjectID `json:"accountType"`
	Balance       *float64            `json:"balance,omitempty"`
}
