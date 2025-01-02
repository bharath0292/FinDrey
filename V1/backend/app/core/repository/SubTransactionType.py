from typing import List

from app.core.schema.SubTransactionType import Response
from app.db.mongodb import sub_transaction_type_db


class SubTransactionTypeRepository:
    async def get_sub_transaction_types(self) -> List[Response] | None:
        sub_transaction_types: List[Response] = []
        async for sub_transaction_type in sub_transaction_type_db.find({}):  # type: ignore
            sub_transaction_types.append(
                Response(
                    transaction_type=sub_transaction_type["transaction_type"],
                    sub_transaction_type=sub_transaction_type["sub_transaction_type"],
                )
            )

        return sub_transaction_types
