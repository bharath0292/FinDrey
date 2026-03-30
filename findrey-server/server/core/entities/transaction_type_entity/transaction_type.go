package transaction_type_entity

import (
	dto "github.com/bharath0292/findrey-server/server/core/dto/transaction_type_dto"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TransactionType struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	TransactionType string             `bson:"transactionType" json:"transactionType"`
}

func (a TransactionType) CreateResponseDTO() dto.TransactionTypeResponseDTO {
	return dto.TransactionTypeResponseDTO{
		ID:              a.ID,
		TransactionType: a.TransactionType,
	}
}
