package middlewares

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"

	dto "github.com/bharath0292/findrey-server/server/core/dto"
)

func APIKeyMiddleware() gin.HandlerFunc {

	var validAPIKey = os.Getenv("API_AUTH_KEY")

	return func(c *gin.Context) {
		if c.Request.Method == http.MethodOptions {
			c.Next()
			return
		}

		apiKey := c.GetHeader("X-API-KEY")

		if apiKey == "" || apiKey != validAPIKey {
			dto.ErrorResponse(c, http.StatusUnauthorized, "Invalid or missing API key")
			c.Abort()
			return
		}

		c.Next()
	}
}
