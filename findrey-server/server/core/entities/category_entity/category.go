package category_entity

import (
	"time"

	dto "github.com/bharath0292/findrey-server/server/core/dto/category_dto"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Category struct {
	ID              primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	UserID          primitive.ObjectID `bson:"userId" json:"userId"`
	Category        string             `json:"category"`
	TransactionType primitive.ObjectID `bson:"transactionType" json:"transactionType"`
	CreatedAt       time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt       time.Time          `bson:"updatedAt" json:"updatedAt"`
	Deleted         bool               `bson:"deletedCategory" json:"deletedCategory"`
	DeletedDate     *time.Time         `bson:"deletedAt,omitempty" json:"deletedAt,omitempty"`
}

func (c Category) CreateResponseDTO() dto.CategoryResponseDTO {
	return dto.CategoryResponseDTO{
		ID:              c.ID,
		UserId:          c.UserID,
		Category:        c.Category,
		TransactionType: c.TransactionType,
	}
}
