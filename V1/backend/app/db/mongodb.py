import os
from urllib.parse import quote_plus

import motor.motor_asyncio

MONGO_DETAILS = (
    f"mongodb+srv://{os.getenv('MONGO_USERNAME')}:"
    + quote_plus(os.getenv("MONGO_PASSWORD") or "")
    + "@personal.23ipegd.mongodb.net/?retryWrites=true&w=majority"
)

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

db = client["FinDrey"]
account_db = db.get_collection("Accounts")
account_type_db = db.get_collection("AccountTypes")
category_db = db.get_collection("Category")
transaction_type_db = db.get_collection("TransactionType")
sub_transaction_type_db = db.get_collection("SubTransactionType")
transactions_db = db.get_collection("Transactions")
