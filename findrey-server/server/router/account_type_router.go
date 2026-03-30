package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/account_type_controller"

	"github.com/gin-gonic/gin"
)

func RegisterAccountTypesRouter(router *gin.Engine) {
	group := router.Group("/api/account-types")
	{
		group.GET("", controller.GetAllAccountType)
	}
}
