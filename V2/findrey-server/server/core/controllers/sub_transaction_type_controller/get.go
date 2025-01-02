package sub_transaction_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto/sub_transaction_type_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/sub_transaction_type_repository"

	"github.com/bharath0292/findrey-server/server/core/dto"

	"github.com/gin-gonic/gin"
)

func GetAllSubTransactionType(c *gin.Context) {
	subTransactionTypes, count, err := repository.GetAllSubTransactionType()
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var subTransactionTypesResponse []sub_transaction_type_dto.SubTransactionTypeResponseDTO
	for _, subTransactionType := range subTransactionTypes {
		subTransactionTypesResponse = append(subTransactionTypesResponse, subTransactionType.CreateResponseDTO())
	}

	dto.SuccessResponse(
		c, http.StatusOK, subTransactionTypesResponse, count,
	)
}
