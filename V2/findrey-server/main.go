package main

import (
	"net/http"
	"time"

	config "github.com/bharath0292/findrey-server/config"
	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/middlewares"
	routers "github.com/bharath0292/findrey-server/server/router"

	"github.com/bharath0292/findrey-server/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	_, _ = time.LoadLocation("Asia/Kolkata")

	gin.SetMode(gin.DebugMode)

	// Load .env file
	err := godotenv.Load()
	if err != nil {
		panic("Error loading.env file")
	}

	config.InitConfig()
	utils.InitLogger()

	err = adapters.InitMongoClient()
	if err != nil {
		panic(err)
	}
}

func main() {
	router := gin.Default()

	router.Use(middlewares.LoggingMiddleware())
	// router.Use(middlewares.APIKeyMiddleware())

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-Requested-With", "X-Api-Key"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.OPTIONS("/*cors", func(c *gin.Context) {
		c.JSON(http.StatusOK, nil)
	})
	routers.RegisterUsersRouter(router)
	routers.RegisterTransactionsRouter(router)
	routers.RegisterAccountsRouter(router)
	routers.RegisterAccountTypesRouter(router)
	routers.RegisterTransactionTypesRouter(router)
	routers.RegisterSubTransactionTypesRouter(router)
	routers.RegisterCategoryRouter(router)
	routers.RegisterDescriptionsRouter(router)

	router.Run("0.0.0.0:8080")
}
