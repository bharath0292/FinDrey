package user_entity

import (
	"time"

	dto "github.com/bharath0292/findrey-server/server/core/dto/user_dto"
	"github.com/bharath0292/findrey-server/server/core/entities/image_entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Username  string             `bson:"username"`
	Email     string             `bson:"email"`
	Password  string             `bson:"password"`
	Image     image_entity.Image `bson:"image"`
	Role      string             `bson:"role"`
	CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt" json:"updatedAt"`
}

func (u User) CreateResponseDTO() dto.UserResponseDTO {
	return dto.UserResponseDTO{
		ID:       u.ID,
		Username: u.Username,
		Email:    u.Email,
		Password: u.Password,
		Image:    u.Image,
		Role:     u.Role,
	}
}
