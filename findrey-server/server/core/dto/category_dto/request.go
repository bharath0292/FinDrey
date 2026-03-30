package category_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CategoryRequestDTO struct {
	ID primitive.ObjectID `json:"id"`
}

type CreateCategoryRequestDTO struct {
	UserID          primitive.ObjectID `json:"userId"`
	Category        string             `json:"category"`
	TransactionType primitive.ObjectID `json:"transactionType"`
}

type UpdateCategoryRequestDTO struct {
	ID              primitive.ObjectID `json:"id"`
	UserID          primitive.ObjectID `json:"userId"`
	Category        string             `json:"category"`
	TransactionType primitive.ObjectID `json:"transactionType"`
}
