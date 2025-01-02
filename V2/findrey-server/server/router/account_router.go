package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/account_controller"

	"github.com/gin-gonic/gin"
)

func RegisterAccountsRouter(router *gin.Engine) {
	group := router.Group("/api/accounts")
	{
		group.GET("", controller.GetAccounts)
		group.GET("/query", controller.GetFilteredAccounts)
		group.POST("", controller.CreateAccount)
		group.PUT("", controller.UpdateBankAccount)
		group.DELETE("", controller.DeleteBankAccount)
	}
}
