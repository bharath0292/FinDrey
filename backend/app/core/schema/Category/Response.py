from pydantic import BaseModel


class Response(BaseModel):
    category: str
