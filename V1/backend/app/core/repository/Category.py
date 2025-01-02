from typing import List

from app.core.model.Category import CategoryModel
from app.core.schema.Category.Response import Response
from app.db.mongodb import category_db
from fastapi.encoders import jsonable_encoder
from pymongo.errors import DuplicateKeyError


class CategoryRepository:
    async def read_category_list(self, user_id: str) -> List[str] | None:
        categories = []
        async for category in category_db.find(  # type: ignore
            {"$or": [{"user_id": user_id}, {"user_id": "ALL"}]}
        ):
            categories.append(
                category["category"],
            )

        return categories

    async def create_category(self, user_id: str, category: str) -> Response:
        new_category: CategoryModel = CategoryModel(user_id=user_id, category=category)

        new_category_json = jsonable_encoder(new_category)

        available_category = await category_db.find_one(  # type: ignore
            {
                "$or": [
                    {"user_id": user_id, "category": category},
                    {"user_id": "ALL", "category": category},
                ]
            }
        )

        if available_category:
            raise DuplicateKeyError(error="Account already exists")

        created_account_result = await category_db.insert_one(  # type: ignore
            new_category_json
        )

        created_account = await category_db.find_one(  # type: ignore
            {"_id": created_account_result.inserted_id, "user_id": user_id}
        )

        return Response(category=created_account["category"])
