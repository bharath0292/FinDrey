package transaction_entity

import (
	"time"

	dto "github.com/bharath0292/findrey-server/server/core/dto/transaction_dto"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Transaction struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	UserID             primitive.ObjectID `bson:"userId" json:"userId"`
	TransactionDate    time.Time          `bson:"transactionDate" json:"transactionDate"`
	TransactionType    primitive.ObjectID `bson:"transactionType" json:"transactionType"`
	SubTransactionType primitive.ObjectID `bson:"subTransactionType,omitempty" json:"subTransactionType,omitempty"`
	DebitAccount       primitive.ObjectID `bson:"debitAccount" json:"debitAccount"`
	CreditAccount      primitive.ObjectID `bson:"creditAccount,omitempty" json:"creditAccount,omitempty"`
	Category           primitive.ObjectID `bson:"category" json:"category"`
	Description        string             `bson:"description" json:"description"`
	Amount             float64            `bson:"amount" json:"amount"`
	CreatedAt          time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt          time.Time          `bson:"updatedAt" json:"updatedAt"`
}

func (t Transaction) CreateResponseDTO() dto.TransactionResponseDTO {
	return dto.TransactionResponseDTO{
		ID:                 t.ID,
		UserID:             t.UserID,
		TransactionDate:    t.TransactionDate,
		TransactionType:    t.TransactionType,
		SubTransactionType: t.SubTransactionType,
		DebitAccount:       t.DebitAccount,
		CreditAccount:      t.CreditAccount,
		Category:           t.Category,
		Description:        t.Description,
		Amount:             t.Amount,
		CreatedAt:          t.CreatedAt,
		UpdatedAt:          t.UpdatedAt,
	}
}
