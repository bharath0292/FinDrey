from enum import StrEnum


class TransactionType(StrEnum):
    EXPENSE = "Expense"
    ATM_WITHDRAWAL = "ATM Withdrawal"
    CASH_RECIEVED = "Cash Recieved"
    CASHBACK = "Cashback"
    REFUND = "Refund"
    LEND = "Lend"
    TRANSFER = "Transfer"
    INCOME = "Income"
    DEBT = "Debt"


class SubTransactionType(StrEnum):
    SALARY = "Salary"
    TRANSFER_OWN = "Transfer Own"
    GIVE = "Give"
    TAKE = "Take"
    TRANSFER_OTHERS = "Transfer Others"
    CREDIT_CARD_PAYMENT = "Credit Card Payment"
    WALLET_PAYMENT = "Wallet Payment"
    CLAIMS = "Claims"


class AccountTypes(StrEnum):
    SALARY = "Salary"
    TRANSFER_OWN = "Transfer Own"
    GIVE = "Give"
    TAKE = "Take"
    TRANSFER_OTHERS = "Transfer Others"
    CREDIT_CARD_PAYMENT = "Credit Card Payment"
    WALLET_PAYMENT = "Wallet Payment"
    CLAIMS = "Claims"
