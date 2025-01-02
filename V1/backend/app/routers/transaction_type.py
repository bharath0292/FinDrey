from typing import List

from app.core.controller.TransactionType import TransactionTypeController
from app.core.schema.Responses.Error import ErrorModel, Errors
from app.core.schema.Responses.Success import Success
from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse

transactionTypeRouter = APIRouter(prefix="/transaction-type")
transactionTypeController = TransactionTypeController()


@transactionTypeRouter.get(
    "/",
    response_model=List[str],
    status_code=status.HTTP_200_OK,
    tags=["TransactionType-Controller"],
    dependencies=None,
    summary="Get All transaction types",
    description="Get all transaction types",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": List[str],
            "description": "TransactionTypes found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def get_transaction_types() -> List[str] | ORJSONResponse:
    if transaction_types := await transactionTypeController.get_all():
        return transaction_types
    else:
        return Errors.HTTP_404_NOT_FOUND
