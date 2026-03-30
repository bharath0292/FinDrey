package category_controller

import (
	"net/http"
	"time"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/category_dto"
	entity "github.com/bharath0292/findrey-server/server/core/entities/category_entity"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/category_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/gin-gonic/gin"
)

func CreateCategory(c *gin.Context) {
	var request category_dto.CreateCategoryRequestDTO
	if err := c.ShouldBindJSON(&request); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	category := entity.Category{
		UserID:          request.UserID,
		Category:        request.Category,
		TransactionType: request.TransactionType,
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
		Deleted:         false,
		DeletedDate:     nil,
	}

	createdCategory, err := repository.CreateCategory(category)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(
		c, http.StatusOK, createdCategory.CreateResponseDTO(), 1,
	)
}
