from typing import List

from app.core.controller.Transactions import TransactionsController
from app.core.schema.Responses.Error import ErrorModel, Errors
from app.core.schema.Responses.Success import Success
from app.core.schema.Transactions.Request import (
    CreateRequest,
    DeleteRequest,
    UpdateRequest,
)
from app.core.schema.Transactions.Response import Response
from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse
from pymongo.errors import DuplicateKeyError

transactionsRouter = APIRouter(prefix="/transactions")
transactionsController = TransactionsController()


@transactionsRouter.get(
    "/",
    response_model=List[Response],
    status_code=status.HTTP_200_OK,
    tags=["Transactions-Controller"],
    dependencies=None,
    summary="Get All transactions",
    description="Get all transactions for user",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": List[Response],
            "description": "Transactions found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def read_transaction_list(user_id: str) -> List[Response] | ORJSONResponse:
    if transaction := await transactionsController.get_all(user_id=user_id):
        return transaction
    else:
        return Errors.HTTP_404_NOT_FOUND


@transactionsRouter.post(
    "/",
    response_model=Response,
    status_code=status.HTTP_201_CREATED,
    tags=["Transactions-Controller"],
    dependencies=None,
    summary="Create Transaction",
    description="Create a new transaction in db",
    response_description="Successful Response",
    responses={
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
        Errors.HTTP_409_ALREADY_EXISTS.status_code: {
            "model": ErrorModel,
            "description": "Transaction already exists",
        },
        status.HTTP_201_CREATED: {
            "model": Response,
            "description": "Successfully Created",
        },
    },
)
async def create_transaction(transaction: CreateRequest) -> Response | ORJSONResponse:
    try:
        return await transactionsController.create_transaction(
            user_id=transaction.user_id,
            transaction_date=transaction.transactionDate,
            transaction_type=transaction.transactionType,
            sub_transaction_type=transaction.subTransactionType,
            debit_account=transaction.debitAccount,
            credit_account=transaction.creditAccount,
            category=transaction.category,
            description=transaction.description,
            amount=transaction.amount,
        )
    except DuplicateKeyError:
        return Errors.HTTP_409_ALREADY_EXISTS


@transactionsRouter.put(
    "/",
    response_model=Response,
    status_code=status.HTTP_200_OK,
    tags=["Transactions-Controller"],
    dependencies=None,
    summary="Update Transaction",
    description="Update the transaction based on id",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": Response,
            "description": "Transaction updated",
        },
        Errors.HTTP_404_NOT_FOUND.status_code: {
            "model": ErrorModel,
            "description": "Transaction not found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def update_transaction(transaction: UpdateRequest) -> Response | ORJSONResponse:
    if update_transaction := await transactionsController.update_transaction(
        transactionId=transaction.transactionId,
        user_id=transaction.user_id,
        transaction_date=transaction.transactionDate,
        transaction_type=transaction.transactionType,
        sub_transaction_type=transaction.subTransactionType,
        debit_account=transaction.debitAccount,
        credit_account=transaction.creditAccount,
        category=transaction.category,
        description=transaction.description,
        amount=transaction.amount,
    ):
        return update_transaction
    else:
        return Errors.HTTP_404_NOT_FOUND


@transactionsRouter.delete(
    "/",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Transactions-Controller"],
    dependencies=None,
    summary="Delete Transaction",
    description="Delete the transaction based on id",
    response_description="Successful Response",
    responses={
        Success.HTTP_204_NO_CONTENT: {
            "model": None,
            "description": "Transaction deleted successfully",
        },
        Errors.HTTP_404_NOT_FOUND.status_code: {
            "model": ErrorModel,
            "description": "Transaction not found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def delete_todo(transaction: DeleteRequest) -> ORJSONResponse | int:
    deleted_account = await transactionsController.delete_transaction(
        transactionId=transaction.transactionId, user_id=transaction.user_id
    )

    if deleted_account is False:
        return Errors.HTTP_404_NOT_FOUND

    return Success.HTTP_204_NO_CONTENT
