package user_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/user_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/user_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
)

func DeleteUser(c *gin.Context) {
	var requestDTO user_dto.UserRequestDTO

	if err := c.ShouldBindJSON(&requestDTO); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, "Invalid Request")
		return
	}

	_, err := repository.GetUserById(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	err = repository.DeleteUser(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(c, http.StatusNoContent, nil, 1)
}
