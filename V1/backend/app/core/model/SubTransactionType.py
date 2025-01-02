from bson import ObjectId
from pydantic import BaseModel, Field


class SubTransactionTypeModel(BaseModel):
    sub_transaction_type: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "sub_transaction_type": "Transfer In",
            }
        }
