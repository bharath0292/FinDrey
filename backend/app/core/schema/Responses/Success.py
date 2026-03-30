from dataclasses import dataclass

from fastapi import status
from fastapi.responses import ORJSONResponse


@dataclass
class SuccessResponse:
    def __init__(self, message: str) -> None:
        self.message = message


class Success:
    HTTP_201_CREATED = ORJSONResponse(
        SuccessResponse("Successfully Created"), status.HTTP_201_CREATED
    )
    HTTP_200_OK = ORJSONResponse(SuccessResponse("Success"), status.HTTP_200_OK)
    HTTP_204_NO_CONTENT = status.HTTP_204_NO_CONTENT
