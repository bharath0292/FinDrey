package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/transaction_controller"

	"github.com/gin-gonic/gin"
)

func RegisterTransactionsRouter(router *gin.Engine) {
	group := router.Group("/api/transactions")
	{
		group.GET("", controller.GetAllTransactions)
		group.GET("/query", controller.GetFilteredTransactions)
		group.POST("", controller.CreateTransaction)
		group.PUT("", controller.UpdateTransaction)
		group.DELETE("", controller.DeleteTransaction)

	}
}
