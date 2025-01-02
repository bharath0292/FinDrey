package category_controller

import (
	"net/http"

	"github.com/bharath0292/findrey-server/server/core/dto"
	"github.com/bharath0292/findrey-server/server/core/dto/category_dto"
	repository "github.com/bharath0292/findrey-server/server/core/repositories/category_repository"
	response_enum "github.com/bharath0292/findrey-server/server/enums/response"

	"github.com/gin-gonic/gin"
)

func DeleteCategory(c *gin.Context) {
	var requestDTO category_dto.CategoryRequestDTO

	if err := c.ShouldBindJSON(&requestDTO); err != nil {
		dto.ErrorResponse(c, http.StatusBadRequest, response_enum.INVALID_REQUEST.String())
		return
	}

	_, err := repository.GetCategoryByID(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusNotFound, response_enum.NOT_FOUND.String())
		return
	}

	err = repository.DeleteCategory(requestDTO.ID)
	if err != nil {
		dto.ErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	dto.SuccessResponse(c, http.StatusNoContent, nil, 0)
}
