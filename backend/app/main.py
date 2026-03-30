from typing import List

from fastapi import APIRouter, FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.exceptions.response import exception_handler, validation_exception_handler
from app.middleware.log_request import LogIncomingRequest
from app.routers.account_type import accountTypeRouter
from app.routers.accounts import accountRouter
from app.routers.category import categoryRouter
from app.routers.sub_transaction_type import subTransactionTypeRouter
from app.routers.transaction_type import transactionTypeRouter
from app.routers.transactions import transactionsRouter

origins = ["*"]

#########################################
#### Configure the main application #####
#########################################
app = FastAPI(
    title="Findrey",
    description="Personal Finance application",
    version="0.0.1",
    docs_url="/docs",
    # openapi_tags=[{}],
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# configuring handler for validation error in order to format the response
app.exception_handler(RequestValidationError)(validation_exception_handler)

# # configuring handler for generic error in order to format the response
app.exception_handler(Exception)(exception_handler)

# # add middleware to process the request before it is taken by the router func
app.add_middleware(LogIncomingRequest)


#########################################
#### Configure all the implemented  #####
####  controllers in the main app   #####
#########################################
routers: List[APIRouter] = [
    transactionsRouter,
    accountRouter,
    accountTypeRouter,
    categoryRouter,
    transactionTypeRouter,
    subTransactionTypeRouter,
]
for router in routers:
    app.include_router(router)
