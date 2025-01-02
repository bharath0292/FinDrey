from typing import List

from app.core.controller.Account import AccountController
from app.core.schema.Accounts.Request import (
    CreateRequest,
    DeleteRequest,
    UpdateBalanceRequest,
    UpdateRequest,
)
from app.core.schema.Accounts.Response import Response
from app.core.schema.Responses.Error import ErrorModel, Errors
from app.core.schema.Responses.Success import Success
from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse
from pymongo.errors import DuplicateKeyError

accountRouter = APIRouter(prefix="/account")
accountController = AccountController()


@accountRouter.get(
    "/{id}-{user_id}",
    response_model=Response,
    status_code=status.HTTP_200_OK,
    tags=["Account-Controller"],
    dependencies=None,
    summary="Get Account",
    description="Get a account by id",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": Response,
            "description": "Account found",
        },
        Errors.HTTP_404_NOT_FOUND.status_code: {
            "model": ErrorModel,
            "description": "Account not found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def read_todo(id: str, user_id: str) -> Response | ORJSONResponse:
    if account := await accountController.get_account(id=id, user_id=user_id):
        return account
    else:
        return Errors.HTTP_404_NOT_FOUND


@accountRouter.get(
    "/",
    response_model=List[Response],
    status_code=status.HTTP_200_OK,
    tags=["Account-Controller"],
    dependencies=None,
    summary="Get All accounts",
    description="Get all accounts fdr user",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": List[Response],
            "description": "Accounts found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def read_account_list(user_id: str) -> List[Response] | ORJSONResponse:
    if accounts := await accountController.get_all(user_id=user_id):
        return accounts
    else:
        return Errors.HTTP_404_NOT_FOUND


@accountRouter.post(
    "/",
    response_model=Response,
    status_code=status.HTTP_201_CREATED,
    tags=["Account-Controller"],
    dependencies=None,
    summary="Create Account",
    description="Create a new account in db",
    response_description="Successful Response",
    responses={
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
        Errors.HTTP_409_ALREADY_EXISTS.status_code: {
            "model": ErrorModel,
            "description": "Account already exists",
        },
        status.HTTP_201_CREATED: {
            "model": Response,
            "description": "Successfully Created",
        },
    },
)
async def create_account(account: CreateRequest) -> Response | ORJSONResponse:
    try:
        return await accountController.create_account(
            user_id=account.user_id,
            bank_name=account.bank_name,
            account_type=account.account_type,
            account_number=account.account_number,
            balance=account.balance,
        )
    except DuplicateKeyError:
        return Errors.HTTP_409_ALREADY_EXISTS


@accountRouter.put(
    "/",
    response_model=Response,
    status_code=status.HTTP_200_OK,
    tags=["Account-Controller"],
    dependencies=None,
    summary="Update Account",
    description="Update the account based on id",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": Response,
            "description": "Account updated",
        },
        Errors.HTTP_404_NOT_FOUND.status_code: {
            "model": ErrorModel,
            "description": "Account not found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def update_account(account: UpdateRequest) -> Response | ORJSONResponse:
    if updated_account := await accountController.update_account(
        id=account.id,
        user_id=account.user_id,
        bank_name=account.bank_name,
        account_type=account.account_type,
        account_number=account.account_number,
        balance=account.balance,
    ):
        return updated_account
    else:
        return Errors.HTTP_404_NOT_FOUND


@accountRouter.put(
    "/balance",
    response_model=Response,
    status_code=status.HTTP_200_OK,
    tags=["Account-Controller"],
    dependencies=None,
    summary="Update Account balance",
    description="Update the account balance based on id",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": Response,
            "description": "Account balance updated",
        },
        Errors.HTTP_404_NOT_FOUND.status_code: {
            "model": ErrorModel,
            "description": "Account not found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def update_account_balance(
    account: UpdateBalanceRequest,
) -> Response | ORJSONResponse:
    if updated_account := await accountController.update_account_balance(
        id=account.id,
        user_id=account.user_id,
        balance=account.balance,
    ):
        return updated_account
    else:
        return Errors.HTTP_404_NOT_FOUND


@accountRouter.delete(
    "/",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Account-Controller"],
    dependencies=None,
    summary="Delete account",
    description="Delete the account based on id",
    response_description="Successful Response",
    responses={
        Success.HTTP_204_NO_CONTENT: {
            "model": None,
            "description": "Account deleted successfully",
        },
        Errors.HTTP_404_NOT_FOUND.status_code: {
            "model": ErrorModel,
            "description": "Account not found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def delete_todo(account: DeleteRequest) -> ORJSONResponse | int:
    deleted_account = await accountController.delete_account(
        id=account.id, user_id=account.user_id
    )

    if deleted_account is False:
        return Errors.HTTP_404_NOT_FOUND

    return Success.HTTP_204_NO_CONTENT
