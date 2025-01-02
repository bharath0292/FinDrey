package user_controller

import (
	"net/http"
	"time"

	controller_utils "github.com/bharath0292/findrey-server/server/core/controllers/utils"
	image_entity "github.com/bharath0292/findrey-server/server/core/entities/image_entity"
	user_entity "github.com/bharath0292/findrey-server/server/core/entities/user_entity"

	dto "github.com/bharath0292/findrey-server/server/core/dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/user_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateUser(c *gin.Context) {
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_DATA.String())
		return
	}

	userID := c.PostForm("id")
	if userID == "" {
		dto.ErrorResponse(c, http.StatusBadRequest, "User ID is required")
		return
	}

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_ID.String())
		return
	}

	imageBytes, contentType, err := controller_utils.HandleFileUpload(c, "image")
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	username := c.PostForm("username")
	email := c.PostForm("email")
	password := c.PostForm("password")
	role := c.PostForm("role")

	user, err := repository.GetUserById(objectID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	if email != "" && email != user.Email {
		if exists, err := repository.GetUserByEmail(email); err != nil {
			dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
			return
		} else if exists.ID != primitive.NilObjectID {
			dto.ErrorResponse(c, http.StatusConflict, "Email already in use")
			return
		}
	}

	updatedUser := user_entity.User{
		ID:        objectID,
		Username:  controller_utils.IfNonEmpty(username, user.Username),
		Email:     controller_utils.IfNonEmpty(email, user.Email),
		Password:  controller_utils.IfNonEmpty(password, user.Password),
		Image:     user.Image,
		Role:      controller_utils.IfNonEmpty(role, user.Role),
		UpdatedAt: time.Now(),
	}
	if imageBytes != nil {
		updatedUser.Image = image_entity.Image{
			Data:        imageBytes,
			ContentType: contentType,
		}
	}

	modifiedUser, err := repository.UpdateUser(objectID, updatedUser)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(
		c, http.StatusOK, modifiedUser.CreateResponseDTO(), 1,
	)
}
