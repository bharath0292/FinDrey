package routers

import (
	controller "github.com/bharath0292/findrey-server/server/core/controllers/user_controller"

	"github.com/gin-gonic/gin"
)

func RegisterUsersRouter(router *gin.Engine) {
	group := router.Group("/api/users")
	{
		group.GET("", controller.GetAllUsers)
		group.POST("", controller.CreateUser)
		group.PUT("", controller.UpdateUser)
		group.DELETE("", controller.DeleteUser)
	}
}
