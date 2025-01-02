from typing import List

from app.core.controller.AccountType import AccountTypeController
from app.core.schema.Responses.Error import ErrorModel, Errors
from app.core.schema.Responses.Success import Success
from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse

accountTypeRouter = APIRouter(prefix="/account-type")
accountTypeController = AccountTypeController()


@accountTypeRouter.get(
    "/",
    response_model=List[str],
    status_code=status.HTTP_200_OK,
    tags=["AccountType-Controller"],
    dependencies=None,
    summary="Get All account types",
    description="Get all account types",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": List[str],
            "description": "AccountTypes found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def get_account_types() -> List[str] | ORJSONResponse:
    if accounts := await accountTypeController.get_all():
        return accounts
    else:
        return Errors.HTTP_404_NOT_FOUND
