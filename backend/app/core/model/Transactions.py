# The line `from typing import Optional` is importing the `Optional` type hint from the `typing`
# module.
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field


class TransactionModel(BaseModel):
    transactionId: Optional[int | str] = ""
    user_id: str = Field(...)
    transactionDate: str = Field(...)
    transactionType: str = Field(...)
    subTransactionType: str = Field(...)
    debitAccount: str = Field(...)
    creditAccount: str = Field(...)
    category: str = Field(...)
    description: str = Field(...)
    amount: float = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_id": "Jane Doe",
                "transactionDate": "2023-10-20T21:54",
                "transactionType": "Expense",
                "subTransactionType": "",
                "debitAccount": "ICICI-7692",
                "creditAccount": "SBI-7692",
                "category": "Bills",
                "description": "Medium",
                "amount": 1263,
            }
        }
