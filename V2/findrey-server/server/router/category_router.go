package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/category_controller"

	"github.com/gin-gonic/gin"
)

func RegisterCategoryRouter(router *gin.Engine) {
	group := router.Group("/api/category")
	{
		group.GET("", controller.GetCategory)
		group.GET("/query", controller.GetFilteredCategories)
		group.POST("", controller.CreateCategory)
		group.PUT("", controller.UpdateCategory)
		group.DELETE("", controller.DeleteCategory)
	}
}
