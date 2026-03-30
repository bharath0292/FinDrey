package mongo_enum

type MongoCollection int

const (
	Users MongoCollection = iota
	Transactions
	Accounts
	AccountTypes
	TransactionTypes
	SubTransactionTypes
	Categories
)

func (collection MongoCollection) String() string {
	switch collection {
	case Users:
		return "users"
	case Transactions:
		return "transactions"
	case Accounts:
		return "accounts"
	case AccountTypes:
		return "accountTypes"
	case TransactionTypes:
		return "transactionTypes"
	case SubTransactionTypes:
		return "subTransactionTypes"
	case Categories:
		return "categories"
	default:
		return ""
	}
}
