package user_controller

import (
	"net/http"
	"time"

	controller_utils "github.com/bharath0292/findrey-server/server/core/controllers/utils"
	image_entity "github.com/bharath0292/findrey-server/server/core/entities/image_entity"
	user_entity "github.com/bharath0292/findrey-server/server/core/entities/user_entity"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	dto "github.com/bharath0292/findrey-server/server/core/dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/user_repository"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateUser(c *gin.Context) {
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_DATA.String())
		return
	}

	username, email, password, role := c.PostForm("username"), c.PostForm("email"), c.PostForm("password"), c.PostForm("role")
	if username == "" || email == "" || password == "" {
		dto.ErrorResponse(c, http.StatusBadRequest, "Username, email, and password are required")
		return
	}

	imageBytes, contentType, err := controller_utils.HandleFileUpload(c, "image")
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	if exists, err := repository.GetUserByEmail(email); err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	} else if exists.ID != primitive.NilObjectID {
		dto.ErrorResponse(c, http.StatusConflict, response_enum.ALREADY_EXISTS.String())
		return
	}
	newUser := user_entity.User{
		Username:  username,
		Email:     email,
		Password:  password,
		Image:     image_entity.Image{Data: imageBytes, ContentType: contentType},
		Role:      role,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	createdUser, err := repository.CreateUser(newUser)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(
		c, http.StatusCreated, createdUser.CreateResponseDTO(), 1,
	)
}
