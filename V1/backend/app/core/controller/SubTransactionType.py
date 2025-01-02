from typing import List

from app.core.repository.SubTransactionType import SubTransactionTypeRepository
from app.core.schema.SubTransactionType import Response


class SubTransactionTypeController:
    def __init__(self) -> None:
        self.sub_transaction_type_repo = SubTransactionTypeRepository()

    async def get_all(self) -> List[Response] | None:
        return await self.sub_transaction_type_repo.get_sub_transaction_types()
