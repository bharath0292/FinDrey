package middlewares

import (
	"time"

	"github.com/rs/zerolog/log"

	"github.com/gin-gonic/gin"
)

func LoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		startTime := time.Now()

		c.Next()

		duration := time.Since(startTime)
		log.Info().Msgf("[%s] %s %s took %v\n",
			c.Request.Method,
			c.Request.RequestURI,
			c.Request.RemoteAddr,
			duration,
		)

	}
}
