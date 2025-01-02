package account_type_entity

import (
	dto "github.com/bharath0292/findrey-server/server/core/dto/account_type_dto"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AccountType struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	AccountType string             `bson:"accountType" json:"accountType"`
}

func (a AccountType) CreateResponseDTO() dto.AccountTypeResponseDTO {
	return dto.AccountTypeResponseDTO{
		ID:          a.ID,
		AccountType: a.AccountType,
	}
}
