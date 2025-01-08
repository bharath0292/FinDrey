package main

import (
	"fmt"
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
	"github.com/rs/zerolog/log"
)

func init() {
	_, _ = time.LoadLocation("Asia/Kolkata")

	gin.SetMode(gin.DebugMode)

	err := godotenv.Load()
	if err != nil {
		log.Fatal().Msgf("Error loading.env file: %v", err)
	}

	config.InitConfig()
	utils.InitLogger()

	err = adapters.InitMongoClient()
	if err != nil {
		panic(err)
	}
	log.Info().Msgf("Init completed")

}

func main() {
	fmt.Println("Starting the server.....")
	router := gin.Default()

	router.Use(middlewares.LoggingMiddleware())
	// router.Use(middlewares.APIKeyMiddleware())

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://127.0.0.1:3000", "https://findrey-client.fly.dev"},
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
	log.Info().Msgf("App Started")

}
