from typing import List

from app.core.repository.AccountType import AccountTypeRepository


class AccountTypeController:
    def __init__(self) -> None:
        self.account_type_repo = AccountTypeRepository()

    async def get_all(self) -> List[str] | None:
        return await self.account_type_repo.get_account_types()
