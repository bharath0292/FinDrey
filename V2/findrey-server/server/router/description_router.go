package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/transaction_controller"

	"github.com/gin-gonic/gin"
)

func RegisterDescriptionsRouter(router *gin.Engine) {
	group := router.Group("/api/descriptions")
	{
		group.GET("/query", controller.GetFilteredDescriptions)
	}
}
