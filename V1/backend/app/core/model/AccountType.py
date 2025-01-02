from bson import ObjectId
from pydantic import BaseModel, Field


class AccountModel(BaseModel):
    account_type: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "account_type": "ICICI",
            }
        }
