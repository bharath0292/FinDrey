package account_entity

import (
	"time"

	dto "github.com/bharath0292/findrey-server/server/core/dto/account_dto"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Account struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	UserID        primitive.ObjectID `bson:"userId" json:"userId"`
	BankName      string             `bson:"bankName" json:"bankName"`
	AccountNumber string             `bson:"accountNumber" json:"accountNumber"`
	AccountName   string             `bson:"accountName" json:"accountName"`
	AccountType   primitive.ObjectID `bson:"accountType" json:"accountType"`
	Balance       float64            `bson:"balance" json:"balance"`
	CreatedAt     time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt     time.Time          `bson:"updatedAt" json:"updatedAt"`
	Deleted       bool               `bson:"deletedAccount" json:"deletedAccount"`
	DeletedDate   *time.Time         `bson:"deletedAt,omitempty" json:"deletedAt,omitempty"`
}

func (a Account) CreateResponseDTO() dto.AccountResponseDTO {
	return dto.AccountResponseDTO{
		ID:            a.ID,
		UserID:        a.UserID,
		BankName:      a.BankName,
		AccountNumber: a.AccountNumber,
		AccountName:   a.AccountName,
		AccountType:   a.AccountType,
		Balance:       a.Balance,
	}
}
