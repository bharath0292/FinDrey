package transaction_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/transaction_dto"
	account_repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"
	transaction_repository "github.com/bharath0292/findrey-server/server/core/repositories/transaction_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/gin-gonic/gin"
)

func DeleteTransaction(c *gin.Context) {
	var requestDTO transaction_dto.TransactionRequestDTO

	if err := c.ShouldBindJSON(&requestDTO); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	transaction, err := transaction_repository.GetTransactionByID(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	if transaction.CreditAccount != primitive.NilObjectID {
		_, err := account_repository.UpdateBalanceAmount(transaction.CreditAccount, -transaction.Amount)
		if err != nil {
			dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
			return
		}
	}
	if transaction.DebitAccount != primitive.NilObjectID {
		_, err := account_repository.UpdateBalanceAmount(transaction.DebitAccount, transaction.Amount)
		if err != nil {
			dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
			return
		}
	}

	err = transaction_repository.DeleteTransaction(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(c, http.StatusNoContent, nil, 0)
}
