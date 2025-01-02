package category_controller

import (
	"net/http"
	"strconv"

	"github.com/bharath0292/findrey-server/server/core/dto/category_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/category_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetCategory(c *gin.Context) {
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

	categories, count, err := repository.GetAllActiveCategories(userObjectID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var categoriesResponse []category_dto.CategoryResponseDTO
	for _, category := range categories {
		categoriesResponse = append(categoriesResponse, category.CreateResponseDTO())
	}

	dto.SuccessResponse(
		c, http.StatusOK, categoriesResponse, count,
	)
}

func GetFilteredCategories(c *gin.Context) {
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
	sortBy := c.DefaultQuery("sortBy", "createdAt")
	sortOrder := c.DefaultQuery("sortOrder", "asc")
	search := c.Query("search")

	categories, count, err := repository.GetFilteredCategories(userObjectID, page, noOfItemsInPage, sortBy, sortOrder, search)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	categoriesResponse := make([]category_dto.CategoryResponseDTO, 0)
	for _, category := range categories {
		categoriesResponse = append(categoriesResponse, category.CreateResponseDTO())
	}

	dto.SuccessResponse(c, http.StatusOK, categoriesResponse, count)
}
