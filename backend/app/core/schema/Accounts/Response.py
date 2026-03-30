from datetime import datetime

from pydantic import BaseModel


class Response(BaseModel):
    id: str
    bank_name: str
    account_number: str | None
    account_name: str
    account_type: str
    balance: float
    balance_updated_time: datetime | None
