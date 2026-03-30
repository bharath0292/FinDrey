package sub_transaction_type_entity

import (
	dto "github.com/bharath0292/findrey-server/server/core/dto/sub_transaction_type_dto"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SubTransactionType struct {
	ID                  primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	TransactionType     primitive.ObjectID `bson:"transactionType" json:"transactionType"`
	SubTransactionTypes string             `bson:"subTransactionType" json:"subTransactionType"`
}

func (a SubTransactionType) CreateResponseDTO() dto.SubTransactionTypeResponseDTO {
	return dto.SubTransactionTypeResponseDTO{
		ID:                 a.ID,
		TransactionType:    a.TransactionType,
		SubTransactionType: a.SubTransactionTypes,
	}
}
