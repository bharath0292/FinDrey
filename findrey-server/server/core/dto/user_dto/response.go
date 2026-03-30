package user_dto

import (
	"github.com/bharath0292/findrey-server/server/core/entities/image_entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserResponseDTO struct {
	ID       primitive.ObjectID `json:"id"`
	Username string             `json:"username"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
	Image    image_entity.Image `json:"image"`
	Role     string             `json:"role"`
}
