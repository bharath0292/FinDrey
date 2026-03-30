import os

from fastapi import Depends
from fastapi.security import HTTPBearer, OAuth2PasswordBearer


class Authorization:
    method = HTTPBearer()
    oauth2 = OAuth2PasswordBearer(tokenUrl="token")
    AUTH_KEY = os.environ["AUTH_KEY"]

    @staticmethod
    def verify_token(token: str = Depends(oauth2)) -> bool:
        return token == Authorization.AUTH_KEY
