from __future__ import annotations

import sys

import loguru
from loguru import logger


class Logger:
    def __init__(self) -> None:
        logger.remove()

    def logger(self) -> loguru.Logger:
        logging_format: str = (
            "<green>{time:YYYY-MM-DD HH:mm:ss:ms}</green> - "
            + "<white>{file.path}</white> - "
        )
        logging_format += "<magenta>{function}</magenta> - "
        logging_format += "<yellow>{line}</yellow> - "
        logging_format += "{level} - {message}"

        logger.add(
            sys.stdout,
            level="INFO",
            format=logging_format,
            colorize=True,
        )

        logger.add(
            "./log/log.log",
            level="INFO",
            rotation="10 days",
            format="{time:YYYY-MM-DD HH:mm:ss:ms} - {file.path} - {function} - {line} - {level} - {message}",
            enqueue=True,
            colorize=True,
        )

        return logger
