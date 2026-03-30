from typing import List

from app.db.mongodb import account_type_db


class AccountTypeRepository:
    async def get_account_types(self) -> List[str] | None:
        account_types: List[str] = []
        async for account_type in account_type_db.find({}):  # type: ignore
            account_types.append(
                account_type["account_type"],
            )

        return account_types
