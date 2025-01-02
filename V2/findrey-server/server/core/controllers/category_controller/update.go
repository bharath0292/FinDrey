package category_controller

import (
	"net/http"
	"time"

	controller_utils "github.com/bharath0292/findrey-server/server/core/controllers/utils"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/category_dto"
	"github.com/bharath0292/findrey-server/server/core/entities/category_entity"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/category_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateCategory(c *gin.Context) {
	var request category_dto.UpdateCategoryRequestDTO
	if err := c.ShouldBindJSON(&request); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_DATA.String())
		return
	}

	category, err := repository.GetCategoryByID(request.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	updatedCategory := category_entity.Category{
		Category:  controller_utils.IfNonEmpty(request.Category, category.Category),
		UpdatedAt: time.Now(),
	}

	if request.TransactionType != primitive.NilObjectID {
		updatedCategory.TransactionType = request.TransactionType
	} else {
		updatedCategory.TransactionType = category.TransactionType
	}

	modifiedCategory, err := repository.UpdateCategory(request.ID, updatedCategory)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(
		c, http.StatusOK, modifiedCategory.CreateResponseDTO(), 1,
	)
}
