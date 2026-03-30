package account_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AccountResponseDTO struct {
	ID            primitive.ObjectID `json:"id"`
	UserID        primitive.ObjectID `json:"userId"`
	BankName      string             `json:"bankName"`
	AccountNumber string             `json:"accountNumber"`
	AccountName   string             `json:"accountName"`
	AccountType   primitive.ObjectID `json:"accountType"`
	Balance       float64            `json:"balance"`
}
