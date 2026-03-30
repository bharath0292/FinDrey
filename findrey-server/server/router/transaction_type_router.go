package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/transaction_type_controller"

	"github.com/gin-gonic/gin"
)

func RegisterTransactionTypesRouter(router *gin.Engine) {
	group := router.Group("/api/transaction-types")
	{
		group.GET("", controller.GetAllTransactionType)
	}
}
