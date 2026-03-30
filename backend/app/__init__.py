from dotenv import load_dotenv

from utils.logger import Logger

load_dotenv()
logger = Logger().logger()

__all__ = ["logger"]
