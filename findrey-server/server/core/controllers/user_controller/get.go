package user_controller

import (
	"net/http"

	dto "github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/user_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/user_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
)

func GetAllUsers(c *gin.Context) {
	var users, count, err = repository.GetAllUsers()
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var usersResponse []user_dto.UserResponseDTO
	for _, user := range users {
		usersResponse = append(usersResponse, user.CreateResponseDTO())
	}

	dto.SuccessResponse(
		c, http.StatusOK, usersResponse, count)
}

func GetUser(c *gin.Context) {
	var requestDto user_dto.UserRequestDTO

	user, err := repository.GetUserById(requestDto.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	dto.SuccessResponse(
		c, http.StatusOK, user, 1)
}
