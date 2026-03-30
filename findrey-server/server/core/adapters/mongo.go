package adapters

import (
	"context"

	"github.com/bharath0292/findrey-server/config"

	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoClient struct {
	DB *mongo.Client
}

var mongoClient *mongo.Client

func InitMongoClient() error {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(config.MongoDBConfig.URI).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		log.Fatal().Msgf("Failed to connect MongoDB: %v", err)
		return err
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal().Msgf("Failed to connect MongoDB: %v", err)
		return err
	}

	mongoClient = client
	log.Debug().Msgf("Pinged your deployment. You successfully connected to MongoDB!")

	return err
}

func DisconnectMongoClient() {
	if err := mongoClient.Disconnect(context.TODO()); err != nil {
		log.Fatal().Msgf("Failed to disconnect MongoDB: %v", err)
	}
	log.Debug().Msgf("Mongo client disconnected")
}

func GetMongoClient() (*mongo.Client, string) {
	return mongoClient, config.MongoDBConfig.DB
}
