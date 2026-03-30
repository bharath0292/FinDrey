from typing import List

from app.core.repository.Category import CategoryRepository
from app.core.schema.Category.Response import Response


class CategoryController:
    def __init__(self) -> None:
        self.category_repo = CategoryRepository()

    async def get_all(self, user_id: str) -> List[str] | None:
        return await self.category_repo.read_category_list(user_id=user_id)

    async def create_category(self, user_id: str, category: str) -> Response:
        return await self.category_repo.create_category(
            user_id=user_id, category=category
        )
