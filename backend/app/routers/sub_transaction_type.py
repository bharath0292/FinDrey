from typing import List

from app.core.controller.SubTransactionType import SubTransactionTypeController
from app.core.schema.Responses.Error import ErrorModel, Errors
from app.core.schema.Responses.Success import Success
from app.core.schema.SubTransactionType import Response
from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse

subTransactionTypeRouter = APIRouter(prefix="/sub-transaction-type")
subTransactionTypeController = SubTransactionTypeController()


@subTransactionTypeRouter.get(
    "/",
    response_model=List[Response],
    status_code=status.HTTP_200_OK,
    tags=["SubtransactionType-Controller"],
    dependencies=None,
    summary="Get All subTransaction types",
    description="Get all subTransaction types",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": List[Response],
            "description": "SubTransactionTypes found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def get_sub_transaction_types() -> List[Response] | ORJSONResponse:
    if sub_transaction_types := await subTransactionTypeController.get_all():
        return sub_transaction_types
    else:
        return Errors.HTTP_404_NOT_FOUND
