from datetime import datetime

from pydantic import BaseModel


class Response(BaseModel):
    transaction_type: str
    sub_transaction_type: str
