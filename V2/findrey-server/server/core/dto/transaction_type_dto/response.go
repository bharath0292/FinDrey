package transaction_type_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TransactionTypeResponseDTO struct {
	ID              primitive.ObjectID `json:"id"`
	TransactionType string             `json:"transactionType"`
}
