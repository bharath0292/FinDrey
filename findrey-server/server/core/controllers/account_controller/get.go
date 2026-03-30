package account_controller

import (
	"net/http"
	"strconv"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/account_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/account_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAccounts(c *gin.Context) {
	userID := c.Query("userId")
	if userID == "" {
		dto.ErrorResponse(c, http.StatusBadRequest, "User Id is missing")
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_ID.String())
		return
	}

	accounts, count, err := repository.GetAllActiveAccounts(userObjectID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var accountsResponse []account_dto.AccountResponseDTO
	for _, account := range accounts {
		accountsResponse = append(accountsResponse, account.CreateResponseDTO())
	}

	dto.SuccessResponse(
		c, http.StatusOK, accountsResponse, count)
}

func GetFilteredAccounts(c *gin.Context) {
	userID := c.Query("userId")
	if userID == "" {
		dto.ErrorResponse(c, http.StatusBadRequest, "User Id is missing")
		return
	}

	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_ID.String())
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	noOfItemsInPage, _ := strconv.Atoi(c.DefaultQuery("noOfItemsInPage", "10"))
	sortBy := c.DefaultQuery("sortBy", "accountName")
	sortOrder := c.DefaultQuery("sortOrder", "asc")
	search := c.Query("search")

	accounts, count, err := repository.GetFilteredAccounts(userObjectID, page, noOfItemsInPage, sortBy, sortOrder, search)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	accountsResponse := make([]account_dto.AccountResponseDTO, 0)
	for _, account := range accounts {
		accountsResponse = append(accountsResponse, account.CreateResponseDTO())
	}

	dto.SuccessResponse(c, http.StatusOK, accountsResponse, count)
}
