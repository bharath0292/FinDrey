package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/sub_transaction_type_controller"

	"github.com/gin-gonic/gin"
)

func RegisterSubTransactionTypesRouter(router *gin.Engine) {
	group := router.Group("/api/sub-transaction-types")
	{
		group.GET("", controller.GetAllSubTransactionType)
	}
}
