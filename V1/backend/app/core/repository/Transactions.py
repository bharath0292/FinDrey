import asyncio
from typing import List, Literal

from app.core.model.Transactions import TransactionModel
from app.core.schema.Transactions.Response import Response
from app.db.mongodb import transactions_db
from fastapi.encoders import jsonable_encoder


class TransactionRepository:
    async def read_transaction_list(self, user_id: str) -> List[Response] | None:
        transactions = []
        async for transaction in transactions_db.find({"user_id": user_id}):  # type: ignore
            transactions.append(
                Response(
                    transactionId=transaction["transactionId"],
                    user_id=transaction["user_id"],
                    transactionDate=transaction["transactionDate"],
                    transactionType=transaction["transactionType"],
                    subTransactionType=transaction["subTransactionType"],
                    debitAccount=transaction["debitAccount"],
                    creditAccount=transaction["creditAccount"],
                    category=transaction["category"],
                    description=transaction["description"],
                    amount=transaction["amount"],
                )
            )

        return transactions

    async def read_transaction(
        self, transactionId: int, user_id: str
    ) -> Response | None:
        if transaction := await transactions_db.find_one(  # type: ignore
            {"transactionId": transactionId, "user_id": user_id}
        ):
            return Response(
                transactionId=transaction["transactionId"],
                user_id=transaction["user_id"],
                transactionDate=transaction["transactionDate"],
                transactionType=transaction["transactionType"],
                subTransactionType=transaction["subTransactionType"],
                debitAccount=transaction["debitAccount"],
                creditAccount=transaction["creditAccount"],
                category=transaction["category"],
                description=transaction["description"],
                amount=transaction["amount"],
            )
        else:
            return None

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
        new_transaction: TransactionModel = TransactionModel(
            transactionId=None,
            user_id=user_id,
            transactionDate=transaction_date,
            transactionType=transaction_type,
            subTransactionType=sub_transaction_type,
            debitAccount=debit_account,
            creditAccount=credit_account,
            category=category,
            description=description,
            amount=amount,
        )

        new_transaction_json = jsonable_encoder(new_transaction)

        created_transaction_result = await transactions_db.insert_one(  # type: ignore
            new_transaction_json
        )

        await asyncio.sleep(1)

        created_transaction = await transactions_db.find_one(  # type: ignore
            {"_id": created_transaction_result.inserted_id}
        )

        return Response(
            transactionId=created_transaction["transactionId"],
            user_id=created_transaction["user_id"],
            transactionDate=created_transaction["transactionDate"],
            transactionType=created_transaction["transactionType"],
            subTransactionType=created_transaction["subTransactionType"],
            debitAccount=created_transaction["debitAccount"],
            creditAccount=created_transaction["creditAccount"],
            category=created_transaction["category"],
            description=created_transaction["description"],
            amount=created_transaction["amount"],
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
        update_transaction: TransactionModel = TransactionModel(
            transactionId=transactionId,
            user_id=user_id,
            transactionDate=transaction_date,
            transactionType=transaction_type,
            subTransactionType=sub_transaction_type,
            debitAccount=debit_account,
            creditAccount=credit_account,
            category=category,
            description=description,
            amount=amount,
        )

        update_transaction_json = jsonable_encoder(update_transaction)

        print("*" * 100)
        print(update_transaction_json)
        print("*" * 100)

        await transactions_db.update_one(  # type: ignore
            {"transactionId": transactionId}, {"$set": update_transaction_json}
        )

        updated_account = await transactions_db.find_one(  # type: ignore
            {"transactionId": transactionId}
        )

        return Response(
            transactionId=updated_account["transactionId"],
            user_id=updated_account["user_id"],
            transactionDate=updated_account["transactionDate"],
            transactionType=updated_account["transactionType"],
            subTransactionType=updated_account["subTransactionType"],
            debitAccount=updated_account["debitAccount"],
            creditAccount=updated_account["creditAccount"],
            category=updated_account["category"],
            description=updated_account["description"],
            amount=updated_account["amount"],
        )

    async def delete_transaction(
        self, transactionId: str | int
    ) -> Literal[None, False]:
        transaction = await transactions_db.find_one({"transactionId": transactionId})  # type: ignore

        if not transaction:
            return False

        await transactions_db.delete_one({"transactionId": transactionId})  # type: ignore

        return None
