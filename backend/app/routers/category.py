from typing import List

from app.core.controller.Category import CategoryController
from app.core.schema.Category.Request import CreateRequest
from app.core.schema.Category.Response import Response
from app.core.schema.Responses.Error import ErrorModel, Errors
from app.core.schema.Responses.Success import Success
from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse
from pymongo.errors import DuplicateKeyError

categoryRouter = APIRouter(prefix="/category")
categoryController = CategoryController()


@categoryRouter.get(
    "/{user_id}",
    response_model=List[str],
    status_code=status.HTTP_200_OK,
    tags=["Category-Controller"],
    dependencies=None,
    summary="Get All categories",
    description="Get all categories",
    response_description="Successful Response",
    responses={
        Success.HTTP_200_OK.status_code: {
            "model": List[Response],
            "description": "Categories found",
        },
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
    },
)
async def read_category_list(user_id: str) -> List[str] | ORJSONResponse:
    if categories := await categoryController.get_all(user_id=user_id):
        return categories
    else:
        return Errors.HTTP_404_NOT_FOUND


@categoryRouter.post(
    "/",
    response_model=Response,
    status_code=status.HTTP_201_CREATED,
    tags=["Category-Controller"],
    dependencies=None,
    summary="Create category",
    description="Create a new category in db",
    response_description="Successful Response",
    responses={
        Errors.HTTP_500_INTERNAL_SERVER_ERROR.status_code: {
            "model": ErrorModel,
            "description": "Generic Error Occured",
        },
        Errors.HTTP_409_ALREADY_EXISTS.status_code: {
            "model": ErrorModel,
            "description": "Category already exists",
        },
        status.HTTP_201_CREATED: {
            "model": Response,
            "description": "Successfully Created",
        },
    },
)
async def create_category(category: CreateRequest) -> Response | ORJSONResponse:
    try:
        return await categoryController.create_category(
            user_id=category.user_id,
            category=category.category,
        )
    except DuplicateKeyError:
        return Errors.HTTP_409_ALREADY_EXISTS
