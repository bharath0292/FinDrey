package config

import (
	"fmt"
	"net/url"
	"os"
)

type MongoDBConfigType struct {
	URI string
	DB  string
}

var MongoDBConfig MongoDBConfigType

func initMongoConfig() {
	var password = url.QueryEscape(os.Getenv("MONGO_DB_PASSWORD"))
	MongoDBConfig = MongoDBConfigType{
		URI: fmt.Sprintf("mongodb+srv://bharath0292:%s@personal.23ipegd.mongodb.net/?retryWrites=true&w=majority&appName=Personal", password),
		DB:  "FinDrey",
	}
}
