package transaction_controller

import (
	"fmt"
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/transaction_dto"
	account_repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"

	transaction_repository "github.com/bharath0292/findrey-server/server/core/repositories/transaction_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
)

func CreateTransaction(c *gin.Context) {
	var requestDTO transaction_dto.CreateTransactionRequestDTO
	fmt.Println(requestDTO)

	if err := c.ShouldBindJSON(&requestDTO); err != nil {
		fmt.Println(err)
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	if requestDTO.CreditAccount != nil {
		_, err := account_repository.UpdateBalanceAmount(*requestDTO.CreditAccount, requestDTO.Amount)
		if err != nil {
			dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
			return
		}
	}
	if requestDTO.DebitAccount != nil {
		_, err := account_repository.UpdateBalanceAmount(*requestDTO.DebitAccount, -requestDTO.Amount)
		if err != nil {
			dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
			return
		}
	}

	transaction, err := transaction_repository.CreateTransaction(requestDTO)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	dto.SuccessResponse(
		c, http.StatusCreated, transaction.CreateResponseDTO(), 1,
	)
}
