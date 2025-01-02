package account_controller

import (
	"net/http"
	"time"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/account_dto"
	entity "github.com/bharath0292/findrey-server/server/core/entities/account_entity"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/gin-gonic/gin"
)

func CreateAccount(c *gin.Context) {
	var request account_dto.CreateAccountRequestDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	account := entity.Account{
		UserID:        request.UserID,
		BankName:      request.BankName,
		AccountNumber: request.AccountNumber,
		AccountName:   request.AccountName,
		AccountType:   request.AccountType,
		Balance:       request.Balance,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
		Deleted:       false,
		DeletedDate:   nil,
	}

	createdAccount, err := repository.CreateAccount(account)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(
		c, http.StatusCreated, createdAccount.CreateResponseDTO(), 1,
	)
}
