import { atom } from 'recoil';
import { AccountType } from '../../types/Account';
import { ItemType } from '../../types/Item';
import { SubTransactionTypesType } from '../../types/SubTransactionTypesType';
import { TransactionsType } from '../../types/Transactions';

export const userState = atom<string>({
  key: 'userState',
  default: 'bharath0292@gmail.com'
});

export const transactionsState = atom<TransactionsType[]>({
  key: 'transactionsState',
  default: []
});

export const accountState = atom<AccountType[]>({
  key: 'accountState',
  default: []
});

export const accountTypeState = atom<ItemType[]>({
  key: 'accountTypeState',
  default: []
});

export const categoryState = atom<ItemType[]>({
  key: 'categoryState',
  default: []
});

export const transactionTypeState = atom<ItemType[]>({
  key: 'transactionTypeState',
  default: []
});

export const subTransactionTypeState = atom<SubTransactionTypesType[]>({
  key: 'subTransactionTypeState',
  default: []
});
