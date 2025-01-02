from datetime import datetime
from typing import List, Literal

from app.core.repository.Account import AccountRepository
from app.core.schema.Accounts.Response import Response


class AccountController:
    def __init__(self) -> None:
        self.account_repo = AccountRepository()

    async def get_all(self, user_id: str) -> List[Response] | None:
        return await self.account_repo.read_account_list(user_id=user_id)

    async def get_account(self, id: str, user_id: str) -> Response | None:
        return await self.account_repo.read_account(id=id, user_id=user_id)

    async def create_account(
        self,
        user_id: str,
        bank_name: str,
        account_type: str,
        account_number: str | None = None,
        initial_balance: float | None = None,
        balance: float | None = None,
    ) -> Response:
        account_name = (
            f"{bank_name.upper()}-{account_number}".strip()
            if account_number
            else bank_name.upper()
        )

        balance_updated_time = datetime.now() if balance else None

        return await self.account_repo.create_account(
            id=account_name,
            user_id=user_id,
            bank_name=bank_name.upper(),
            account_type=account_type,
            account_name=account_name,
            account_number=account_number,
            balance=balance,
            balance_updated_time=balance_updated_time,
        )

    async def update_account(
        self,
        id: str,
        user_id: str,
        bank_name: str,
        account_type: str,
        account_number: str | None,
        balance: float | None,
    ) -> Response:
        account_name = (
            f"{bank_name.upper()}-{account_number}".strip()
            if account_number
            else bank_name.upper()
        )

        balance_updated_time = datetime.now() if balance else None

        return await self.account_repo.update_account(
            old_id=id,
            new_id=account_name,
            user_id=user_id,
            bank_name=bank_name.upper(),
            account_type=account_type,
            account_number=account_number,
            account_name=account_name,
            balance=balance,
            balance_updated_time=balance_updated_time,
        )

    async def update_account_balance(
        self,
        id: str,
        user_id: str,
        balance: float,
    ) -> Response:
        balance_updated_time = datetime.now()

        return await self.account_repo.update_account_balance(
            id=id,
            user_id=user_id,
            balance=balance,
            balance_updated_time=balance_updated_time,
        )

    async def delete_account(self, id: str, user_id: str) -> Literal[None, False]:
        return await self.account_repo.delete_account(id=id, user_id=user_id)
