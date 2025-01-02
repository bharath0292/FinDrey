from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import ORJSONResponse

from app import logger
from app.core.schema.Responses.Error import Errors


async def validation_exception_handler(
    _: Request, exc: RequestValidationError
) -> ORJSONResponse:
    error = exc.errors()[0]
    message = f'Validation error: {".".join(error["loc"])} {error["msg"]}'
    logger.error(message)
    return Errors.HTTP_400_BAD_REQUEST


async def exception_handler(req: Request, exc: Exception) -> ORJSONResponse:
    func_handler = req.state.func_name
    message = f"An error occured during {func_handler} handling. Error: {exc}"
    logger.error(message)
    return Errors.HTTP_500_INTERNAL_SERVER_ERROR
