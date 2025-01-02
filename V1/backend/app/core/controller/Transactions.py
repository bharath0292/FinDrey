from typing import List, Literal

from app.core.controller.Account import AccountController
from app.core.repository.Transactions import TransactionRepository
from app.core.schema.Transactions.Response import Response


class TransactionsController:
    def __init__(self) -> None:
        self.transaction_repo = TransactionRepository()
        self.account_controller = AccountController()

    async def get_all(self, user_id: str) -> List[Response] | None:
        return await self.transaction_repo.read_transaction_list(user_id=user_id)

    async def get_transaction(
        self, transactionId: int, user_id: str
    ) -> Response | None:
        return await self.transaction_repo.read_transaction(
            transactionId=transactionId, user_id=user_id
        )

    async def create_transaction(
        self,
        user_id: str,
        transaction_date: str,
        transaction_type: str,
        sub_transaction_type: str,
        debit_account: str,
        credit_account: str,
        category: str,
        description: str,
        amount: float,
    ) -> Response:
        if debit_account:
            debit_bank_account = await self.account_controller.get_account(
                id=debit_account, user_id=user_id
            )
            if debit_bank_account:
                new_balance = debit_bank_account.balance - amount
                await self.account_controller.update_account_balance(
                    id=debit_account, user_id=user_id, balance=new_balance
                )

        if credit_account:
            credit_bank_account = await self.account_controller.get_account(
                id=credit_account, user_id=user_id
            )
            if credit_bank_account:
                new_balance = credit_bank_account.balance + amount
                await self.account_controller.update_account_balance(
                    id=credit_account, user_id=user_id, balance=new_balance
                )

        return await self.transaction_repo.create_transaction(
            user_id=user_id,
            transaction_date=transaction_date,
            transaction_type=transaction_type,
            sub_transaction_type=sub_transaction_type,
            debit_account=debit_account,
            credit_account=credit_account,
            category=category,
            description=description,
            amount=amount,
        )

    async def update_transaction(
        self,
        transactionId: int,
        user_id: str,
        transaction_date: str,
        transaction_type: str,
        sub_transaction_type: str,
        debit_account: str,
        credit_account: str,
        category: str,
        description: str,
        amount: float,
    ) -> Response:
        if await self.reverse_balance(transactionId=transactionId, user_id=user_id):
            await self.add_balance(
                transactionId=transactionId,
                user_id=user_id,
                debit_account=debit_account,
                credit_account=credit_account,
                amount=amount,
            )

        return await self.transaction_repo.update_transaction(
            transactionId=transactionId,
            user_id=user_id,
            transaction_date=transaction_date,
            transaction_type=transaction_type,
            sub_transaction_type=sub_transaction_type,
            debit_account=debit_account,
            credit_account=credit_account,
            category=category,
            description=description,
            amount=amount,
        )

    async def reverse_balance(self, transactionId: int, user_id: str) -> bool:
        transaction = await self.get_transaction(
            transactionId=transactionId, user_id=user_id
        )

        if not transaction:
            return False

        if transaction.debitAccount:
            debit_account = transaction.debitAccount
            debit_amount = transaction.amount

            debit_bank_account = await self.account_controller.get_account(
                id=debit_account, user_id=user_id
            )
            if debit_bank_account:
                new_balance = debit_bank_account.balance + debit_amount
                await self.account_controller.update_account_balance(
                    id=debit_account, user_id=user_id, balance=new_balance
                )

        if transaction.creditAccount:
            credit_account = transaction.creditAccount
            credit_amount = transaction.amount

            credit_bank_account = await self.account_controller.get_account(
                id=credit_account, user_id=user_id
            )
            if credit_bank_account:
                new_balance = credit_bank_account.balance - credit_amount
                await self.account_controller.update_account_balance(
                    id=credit_account, user_id=user_id, balance=new_balance
                )
        return True

    async def add_balance(
        self,
        transactionId: int,
        user_id: str,
        debit_account: str,
        credit_account: str,
        amount: float,
    ) -> bool:
        if debit_account:
            debit_bank_account = await self.account_controller.get_account(
                id=debit_account, user_id=user_id
            )
            if debit_bank_account:
                new_balance = debit_bank_account.balance - amount
                await self.account_controller.update_account_balance(
                    id=debit_account, user_id=user_id, balance=new_balance
                )

        if credit_account:
            credit_bank_account = await self.account_controller.get_account(
                id=credit_account, user_id=user_id
            )
            if credit_bank_account:
                new_balance = credit_bank_account.balance + amount
                await self.account_controller.update_account_balance(
                    id=credit_account, user_id=user_id, balance=new_balance
                )

        return True

    async def delete_transaction(
        self, transactionId: int, user_id: str
    ) -> Literal[None, False]:
        if not await self.reverse_balance(transactionId=transactionId, user_id=user_id):
            return False

        return await self.transaction_repo.delete_transaction(
            transactionId=transactionId
        )
