package account_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/account_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/gin-gonic/gin"
)

func DeleteBankAccount(c *gin.Context) {
	var requestDTO account_dto.AccountRequestDTO

	if err := c.ShouldBindJSON(&requestDTO); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	err := repository.DeleteAccount(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(c, http.StatusNoContent, nil, 0)
}
