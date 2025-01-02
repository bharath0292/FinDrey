from datetime import datetime

from bson import ObjectId
from pydantic import BaseModel, Field


class AccountModel(BaseModel):
    id: str = Field(...)
    user_id: str = Field(...)
    bank_name: str = Field(...)
    account_number: str | None = Field(...)
    account_name: str = Field(...)
    account_type: str = Field(...)
    balance: float | None = Field(...)
    balance_updated_time: datetime | None = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "user_id": "Jane Doe",
                "bank_name": "ICICI",
                "account_number": "7692",
                "account_name": "ICICI-7692",
                "account_type": "BANK ACCOUNT",
                "balance": 7856.87,
                "balance_updated_time": datetime(2023, 10, 12, 0, 0, 0),
            }
        }
