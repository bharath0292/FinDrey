import {
  AccountType,
  AccountTypesType,
  CategoryType,
  SubTransactionTypesType,
  SuccessResponseType,
  TransactionType,
  TransactionTypesType,
} from '@findrey/types';

export type ParamsType = {
  pageNumber: string;
  searchQuery: string;
  descriptionSearch: string;
};

export type TransactionsPage = {
  userId: string;
  pageNumber: number;
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  handleChangeParams: (key: keyof ParamsType, value: string | number) => void;
  transactions: SuccessResponseType<TransactionType[]> | undefined;
  transactionTypes: SuccessResponseType<TransactionTypesType[]> | undefined;
  subTransactionTypes:
    | SuccessResponseType<SubTransactionTypesType[]>
    | undefined;
  accounts: SuccessResponseType<AccountType[]> | undefined;
  accountTypes: SuccessResponseType<AccountTypesType[]> | undefined;
  categories: SuccessResponseType<CategoryType[]> | undefined;
  descriptions: SuccessResponseType<string[]> | undefined;
  descriptionsIsLoading: boolean | undefined;
};
