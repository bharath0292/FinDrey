package category_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryResponseDTO struct {
	ID              primitive.ObjectID `json:"id"`
	UserId          primitive.ObjectID `json:"userId"`
	Category        string             `json:"category"`
	TransactionType primitive.ObjectID `json:"transactionType"`
}
