package account_type_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AccountTypeResponseDTO struct {
	ID          primitive.ObjectID `json:"id"`
	AccountType string             `json:"accountType"`
}
