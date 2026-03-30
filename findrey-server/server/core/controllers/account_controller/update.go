package account_controller

import (
	"net/http"
	"time"

	controller_utils "github.com/bharath0292/findrey-server/server/core/controllers/utils"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/account_dto"
	"github.com/bharath0292/findrey-server/server/core/entities/account_entity"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/gin-gonic/gin"
)

func UpdateBankAccount(c *gin.Context) {
	var request account_dto.UpdateAccountRequestDTO
	if err := c.ShouldBindJSON(&request); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_DATA.String())
		return
	}

	account, err := repository.GetAccountByID(request.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	updatedAccount := account_entity.Account{
		BankName:      controller_utils.DefaultIfEmpty(request.BankName, account.BankName),
		AccountNumber: controller_utils.DefaultIfEmpty(request.AccountNumber, account.AccountNumber),
		AccountName:   controller_utils.DefaultIfEmpty(request.AccountName, account.AccountName),
		Balance:       controller_utils.DefaultIfNil(request.Balance, account.Balance),
		UpdatedAt:     time.Now(),
	}

	if request.AccountType != nil {
		updatedAccount.AccountType = *request.AccountType
	} else {
		updatedAccount.AccountType = account.AccountType
	}

	modifiedAccount, err := repository.UpdateBankAccount(request.ID, updatedAccount)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(
		c, http.StatusOK, modifiedAccount.CreateResponseDTO(), 1,
	)
}
