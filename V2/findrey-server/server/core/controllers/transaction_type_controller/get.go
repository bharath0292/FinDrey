package transaction_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto/transaction_type_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/transaction_type_repository"

	"github.com/bharath0292/findrey-server/server/core/dto"

	"github.com/gin-gonic/gin"
)

func GetAllTransactionType(c *gin.Context) {
	transactionTypes, count, err := repository.GetAllTransactionType()
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var transactionTypesResponse []transaction_type_dto.TransactionTypeResponseDTO
	for _, transactionType := range transactionTypes {
		transactionTypesResponse = append(transactionTypesResponse, transactionType.CreateResponseDTO())
	}

	dto.SuccessResponse(
		c, http.StatusOK, transactionTypesResponse, count,
	)
}
