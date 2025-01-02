import asyncio
import time
from datetime import datetime
from typing import Any, List, Literal

from app.core.model.Account import AccountModel
from app.core.schema.Accounts.Response import Response
from app.db.mongodb import account_db
from fastapi.encoders import jsonable_encoder


class AccountRepository:
    async def read_account_list(self, user_id: str) -> List[Response] | None:
        accounts = []
        async for account in account_db.find({"user_id": user_id}):  # type: ignore
            accounts.append(
                Response(
                    id=account["_id"],
                    bank_name=account["bank_name"],
                    account_number=account["account_number"],
                    account_name=account["account_name"],
                    account_type=account["account_type"],
                    balance=account["balance"],
                    balance_updated_time=account["balance_updated_time"],
                )
            )

        return accounts

    async def read_account(self, id: str, user_id: str) -> Response | None:
        if account := await account_db.find_one(  # type: ignore
            {"_id": id, "user_id": user_id}
        ):
            return Response(
                id=account["_id"],
                bank_name=account["bank_name"],
                account_number=account["account_number"],
                account_name=account["account_name"],
                account_type=account["account_type"],
                balance=account["balance"],
                balance_updated_time=account["balance_updated_time"],
            )
        else:
            return None

    async def create_account(
        self,
        id: str,
        user_id: str,
        bank_name: str,
        account_type: str,
        account_name: str,
        account_number: str | None = None,
        balance: float | None = None,
        balance_updated_time: datetime | None = None,
    ) -> Response:
        new_account: AccountModel = AccountModel(
            id=id,
            user_id=user_id,
            bank_name=bank_name,
            account_number=account_number,
            account_name=account_name,
            account_type=account_type,
            balance=balance,
            balance_updated_time=balance_updated_time,
        )

        new_account_json = jsonable_encoder(new_account)
        new_account_json["_id"] = new_account_json.pop("id")

        # try:
        created_account_result = await account_db.insert_one(  # type: ignore
            new_account_json
        )
        # except Exception as e:
        #     raise e

        created_account = await account_db.find_one(  # type: ignore
            {"_id": created_account_result.inserted_id, "user_id": user_id}
        )

        return Response(
            id=created_account["_id"],
            bank_name=created_account["bank_name"],
            account_number=created_account["account_number"],
            account_name=created_account["account_name"],
            account_type=created_account["account_type"],
            balance=created_account["balance"],
            balance_updated_time=created_account["balance_updated_time"],
        )

    async def update_account(
        self,
        old_id: str,
        new_id: str,
        user_id: str,
        bank_name: str,
        account_type: str,
        account_number: str | None,
        account_name: str,
        balance: float | None,
        balance_updated_time: datetime | None = None,
    ) -> Response:
        update_account: AccountModel = AccountModel(
            id=new_id,
            user_id=user_id,
            bank_name=bank_name,
            account_number=account_number,
            account_name=account_name,
            account_type=account_type,
            balance=balance,
            balance_updated_time=balance_updated_time,
        )

        update_account_json = jsonable_encoder(update_account)
        update_account_json["_id"] = update_account_json.pop("id")
        account = await account_db.find_one({"_id": old_id, "user_id": user_id})  # type: ignore

        changed_key = [
            key
            for key, value in dict(account).items()
            if value != update_account_json[key]
        ]

        if "account_type" in changed_key:
            account["account_type"] = update_account_json["account_type"]

        if "balance" in changed_key:
            account["balance"] = update_account_json["balance"]
            account["balance_updated_time"] = update_account_json[
                "balance_updated_time"
            ]

        if "_id" in changed_key:
            account["_id"] = new_id
            account["bank_name"] = update_account_json["bank_name"]
            account["account_number"] = update_account_json["account_number"]
            account["account_name"] = update_account_json["account_name"]

            created_account_result = await account_db.insert_one(  # type: ignore
                account
            )

            updated_account = await account_db.find_one(  # type: ignore
                {"_id": created_account_result.inserted_id, "user_id": user_id}
            )

            await account_db.delete_one({"_id": old_id, "user_id": user_id})  # type: ignore

            print("change it in all transactions")
        else:
            update_result = await account_db.update_one(  # type: ignore
                {"_id": account["_id"]}, {"$set": account}
            )

            if update_result.modified_count == 1:
                updated_account = await account_db.find_one(  # type: ignore
                    {"_id": account["_id"], "user_id": user_id}
                )

        return Response(
            id=updated_account["_id"],
            bank_name=updated_account["bank_name"],
            account_number=updated_account["account_number"],
            account_name=updated_account["account_name"],
            account_type=updated_account["account_type"],
            balance=updated_account["balance"],
            balance_updated_time=updated_account["balance_updated_time"],
        )

    async def update_account_balance(
        self,
        id: str,
        user_id: str,
        balance: float,
        balance_updated_time: datetime | None = None,
    ) -> Response:
        await account_db.update_one(  # type: ignore
            {"_id": id},
            {
                "$set": {
                    "balance": balance,
                    "balance_updated_time": balance_updated_time,
                }
            },
        )

        updated_account = await account_db.find_one(  # type: ignore
            {"_id": id, "user_id": user_id}
        )

        return Response(
            id=updated_account["_id"],
            bank_name=updated_account["bank_name"],
            account_number=updated_account["account_number"],
            account_name=updated_account["account_name"],
            account_type=updated_account["account_type"],
            balance=updated_account["balance"],
            balance_updated_time=updated_account["balance_updated_time"],
        )

    async def delete_account(self, id: str, user_id: str) -> Literal[None, False]:
        account = await account_db.find_one({"_id": id, "user_id": user_id})  # type: ignore

        if not account:
            return False

        await account_db.delete_one({"_id": id, "user_id": user_id})  # type: ignore

        return None
