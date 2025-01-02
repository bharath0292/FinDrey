package dto

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrorResponse(context *gin.Context, statusCode int, error string) {
	context.JSON(statusCode, gin.H{"error": error})
}

func SuccessResponse(context *gin.Context, statusCode int, data interface{}, count int64) {

	if statusCode == http.StatusNoContent {
		context.Status(http.StatusNoContent)
		return
	}

	context.JSON(statusCode, gin.H{"data": data, "count": count})
}
