from typing import List

from app.db.mongodb import transaction_type_db


class TransactionTypeRepository:
    async def get_transaction_types(self) -> List[str] | None:
        transaction_types: List[str] = []
        async for transaction_type in transaction_type_db.find({}):  # type: ignore
            transaction_types.append(
                transaction_type["transaction_type"],
            )

        return transaction_types
