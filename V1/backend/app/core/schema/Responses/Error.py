from dataclasses import dataclass

from fastapi import status
from fastapi.responses import ORJSONResponse
from pydantic import BaseModel, Field


class ErrorModel(BaseModel):
    error: str = Field(..., description="The error message description")


@dataclass
class ErrorResponse:
    def __init__(self, message: str) -> None:
        self.error = message


class Errors:
    HTTP_500_INTERNAL_SERVER_ERROR = ORJSONResponse(
        ErrorResponse("Internal Server Error"), status.HTTP_500_INTERNAL_SERVER_ERROR
    )
    HTTP_404_NOT_FOUND = ORJSONResponse(
        ErrorResponse("Not found"), status.HTTP_404_NOT_FOUND
    )
    HTTP_400_BAD_REQUEST = ORJSONResponse("Bad Request", status.HTTP_400_BAD_REQUEST)
    HTTP_409_ALREADY_EXISTS = ORJSONResponse("Already exists", status.HTTP_409_CONFLICT)
