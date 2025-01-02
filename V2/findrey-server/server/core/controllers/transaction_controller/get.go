package transaction_controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/transaction_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/transaction_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAllTransactions(c *gin.Context) {
	var transactions, count, err = repository.GetAllTransactions()
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	transactionsResponse := make([]transaction_dto.TransactionResponseDTO, 0)

	for _, transaction := range transactions {

		transactionResponse := transaction_dto.TransactionResponseDTO{
			ID:                 transaction.ID,
			UserID:             transaction.UserID,
			TransactionDate:    transaction.TransactionDate,
			TransactionType:    transaction.TransactionType,
			SubTransactionType: transaction.SubTransactionType,
			DebitAccount:       transaction.DebitAccount,
			CreditAccount:      transaction.CreditAccount,
			Category:           transaction.Category,
			Description:        transaction.Description,
			Amount:             transaction.Amount,
			CreatedAt:          transaction.CreatedAt,
			UpdatedAt:          transaction.UpdatedAt,
		}
		transactionsResponse = append(transactionsResponse, transactionResponse)
	}

	dto.SuccessResponse(c, http.StatusOK, transactionsResponse, count)
}

func GetFilteredTransactions(c *gin.Context) {
	userID := c.Query("userID")
	if userID == "" {
		dto.ErrorResponse(c, http.StatusBadRequest, "User ID not found")
		return
	}
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_ID.String())
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	noOfItemsInPage, _ := strconv.Atoi(c.DefaultQuery("noOfItemsInPage", "10"))
	sortBy := c.DefaultQuery("sortBy", "transactionDate")
	sortOrder := c.DefaultQuery("sortOrder", "asc")
	search := c.Query("search")
	transactions, count, err := repository.GetFilteredTransactions(userObjectID, page, noOfItemsInPage, sortBy, sortOrder, search)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	transactionsResponse := make([]transaction_dto.TransactionResponseDTO, 0)

	for _, transaction := range transactions {

		transactionResponse := transaction_dto.TransactionResponseDTO{
			ID:                 transaction.ID,
			UserID:             transaction.UserID,
			TransactionDate:    transaction.TransactionDate,
			TransactionType:    transaction.TransactionType,
			SubTransactionType: transaction.SubTransactionType,
			DebitAccount:       transaction.DebitAccount,
			CreditAccount:      transaction.CreditAccount,
			Category:           transaction.Category,
			Description:        transaction.Description,
			Amount:             transaction.Amount,
			CreatedAt:          time.Now(),
			UpdatedAt:          time.Now(),
		}
		transactionsResponse = append(transactionsResponse, transactionResponse)
	}

	dto.SuccessResponse(c, http.StatusOK, transactionsResponse, count)
}

func GetFilteredDescriptions(c *gin.Context) {
	noOfItemsInPage, _ := strconv.Atoi(c.DefaultQuery("noOfItemsInPage", "10"))

	userID := c.Query("userID")
	if userID == "" {
		dto.ErrorResponse(c, http.StatusBadRequest, "User ID not found")
		return
	}
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_ID.String())
		return
	}

	search := c.Query("search")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	transactions, count, err := repository.GetFilteredDescriptions(userObjectID, page, noOfItemsInPage, search)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	transactionsResponse := make([]string, 0)

	for _, transaction := range transactions {
		transactionsResponse = append(transactionsResponse, transaction.Description)
	}

	dto.SuccessResponse(c, http.StatusOK, transactionsResponse, count)
}
