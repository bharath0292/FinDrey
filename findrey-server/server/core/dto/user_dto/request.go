package user_dto

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRequestDTO struct {
	ID primitive.ObjectID `json:"userId"`
}
