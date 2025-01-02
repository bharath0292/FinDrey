package transaction_controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/transaction_dto"
	account_repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/bharath0292/findrey-server/server/core/entities/transaction_entity"
	transaction_repository "github.com/bharath0292/findrey-server/server/core/repositories/transaction_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
)

func UpdateTransaction(c *gin.Context) {
	var requestDTO transaction_dto.UpdateTransactionRequestDTO
	if err := c.ShouldBindJSON(&requestDTO); err != nil {
		fmt.Println(err)
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	old_transaction, err := transaction_repository.GetTransactionByID(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	if old_transaction.CreditAccount != primitive.NilObjectID {
		_, err := account_repository.UpdateBalanceAmount(*requestDTO.CreditAccount, -old_transaction.Amount)
		if err != nil {
			dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
			return
		}
	}
	if old_transaction.DebitAccount != primitive.NilObjectID {
		_, err := account_repository.UpdateBalanceAmount(*requestDTO.DebitAccount, old_transaction.Amount)
		if err != nil {
			dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
			return
		}
	}

	updatedTransaction := transaction_entity.Transaction{
		TransactionDate:    requestDTO.TransactionDate,
		TransactionType:    requestDTO.TransactionType,
		SubTransactionType: *requestDTO.SubTransactionType,
		DebitAccount:       *requestDTO.DebitAccount,
		CreditAccount:      *requestDTO.CreditAccount,
		Category:           *requestDTO.Category,
		Description:        requestDTO.Description,
		Amount:             requestDTO.Amount,
		UpdatedAt:          time.Now(),
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

	transaction, err := transaction_repository.UpdateTransaction(requestDTO.ID, updatedTransaction)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	dto.SuccessResponse(
		c, http.StatusCreated, transaction.CreateResponseDTO(), 1,
	)
}
