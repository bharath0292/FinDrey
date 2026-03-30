from pydantic import BaseModel


class CreateRequest(BaseModel):
    user_id: str
    bank_name: str
    account_number: str | None
    account_type: str
    balance: float | None


class UpdateRequest(BaseModel):
    id: str
    user_id: str
    bank_name: str
    account_number: str | None
    account_type: str
    balance: float | None


class UpdateBalanceRequest(BaseModel):
    id: str
    user_id: str
    balance: float


class DeleteRequest(BaseModel):
    id: str
    user_id: str
