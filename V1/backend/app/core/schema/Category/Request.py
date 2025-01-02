from pydantic import BaseModel


class CreateRequest(BaseModel):
    user_id: str
    category: str
