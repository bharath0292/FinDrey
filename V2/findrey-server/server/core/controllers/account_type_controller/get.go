package account_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto/account_type_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/account_type_repository"

	"github.com/bharath0292/findrey-server/server/core/dto"

	"github.com/gin-gonic/gin"
)

func GetAllAccountType(c *gin.Context) {
	accounts, count, err := repository.GetAllAccountType()
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var accountTypesResponse []account_type_dto.AccountTypeResponseDTO
	for _, account := range accounts {
		accountTypesResponse = append(accountTypesResponse, account.CreateResponseDTO())
	}

	dto.SuccessResponse(
		c, http.StatusOK, accountTypesResponse, count,
	)
}
