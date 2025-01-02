package account_repository

import (
	"context"

	adapters "github.com/bharath0292/findrey-server/server/core/adapters"
	"github.com/bharath0292/findrey-server/server/core/entities/account_entity"

	mongo_enums "github.com/bharath0292/findrey-server/server/enums/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func UpdateBankAccount(id primitive.ObjectID, updatedAccount account_entity.Account) (account_entity.Account, error) {
	var mongoClient, database = adapters.GetMongoClient()

	updateData := bson.M{
		"$set": bson.M{
			"bankName":      updatedAccount.BankName,
			"accountNumber": updatedAccount.AccountNumber,
			"accountName":   updatedAccount.AccountName,
			"accountType":   updatedAccount.AccountType,
			"balance":       updatedAccount.Balance,
			"updatedAt":     updatedAccount.UpdatedAt,
		},
	}

	filter := bson.M{"_id": id, "deletedAccount": false}

	_, err := mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).UpdateOne(
		context.TODO(),
		filter,
		updateData,
	)
	if err != nil {
		return account_entity.Account{}, err
	}

	return updatedAccount, nil

}

func UpdateBalanceAmount(id primitive.ObjectID, amount float64) (account_entity.Account, error) {
	var mongoClient, database = adapters.GetMongoClient()

	account, err := GetAccountByID(id)
	if err != nil {
		return account_entity.Account{}, err
	}

	newBalance := amount + account.Balance
	updateData := bson.M{
		"$set": bson.M{
			"balance": newBalance,
		},
	}

	filter := bson.M{"_id": id, "deletedAccount": false}

	_, err = mongoClient.Database(database).Collection(mongo_enums.Accounts.String()).UpdateOne(
		context.TODO(),
		filter,
		updateData,
	)
	if err != nil {
		return account_entity.Account{}, err
	}

	account.Balance = newBalance

	return account, nil

}
