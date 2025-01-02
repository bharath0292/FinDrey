from typing import List

from app.core.repository.TransactionType import TransactionTypeRepository


class TransactionTypeController:
    def __init__(self) -> None:
        self.transaction_type_repo = TransactionTypeRepository()

    async def get_all(self) -> List[str] | None:
        return await self.transaction_type_repo.get_transaction_types()
