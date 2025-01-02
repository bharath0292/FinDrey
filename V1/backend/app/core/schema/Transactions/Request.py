from pydantic import BaseModel


class CreateRequest(BaseModel):
    user_id: str
    transactionDate: str
    transactionType: str
    subTransactionType: str
    debitAccount: str
    creditAccount: str
    category: str
    description: str
    amount: float


class UpdateRequest(BaseModel):
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


class DeleteRequest(BaseModel):
    transactionId: int
    user_id: str
