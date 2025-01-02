from datetime import datetime

from pydantic import BaseModel


class Response(BaseModel):
    transactionId: int
    user_id: str
    transactionDate: str
    transactionType: str
    subTransactionType: str
    debitAccount: str
    creditAccount: str
    category: str
    description: str
    amount: float
