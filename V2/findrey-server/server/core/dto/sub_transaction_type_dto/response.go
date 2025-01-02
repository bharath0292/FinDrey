package sub_transaction_type_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type SubTransactionTypeResponseDTO struct {
	ID                 primitive.ObjectID `json:"id"`
	TransactionType    primitive.ObjectID `json:"transactionType"`
	SubTransactionType string             `json:"subTransactionType"`
}
