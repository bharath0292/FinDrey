import { selector, useRecoilCallback } from 'recoil';
import { getAccountType, getAccounts } from '../../services/accounts';
import { accountState, accountTypeState, userState } from '../atoms/States';

export const accountSelector = selector({
  key: 'accountSelector',
  get: ({ get }) => {
    const accounts = get(accountState);
    return accounts.reduce((items, account) => {
      items.push({ id: account.account_name, label: account.account_name });
      return items;
    }, []);
  }
});

export const accountsSelectorsFamily = selector({
  key: 'accountsSelector',
  get: ({ get }) => {
    const accounts = get(accountState);

    return {
      getFormattedAccounts: () => {
        return accounts.map((account) => ({
          id: account.account_name,
          label: account.account_name
        }));
      },

      getAccountBalance: (accountId: string) => {
        const account = accounts.find((acc) => acc.id === accountId);
        return account ? account.balance : 0;
      }
    };
  }
});

export const useRefreshAccounts = () => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const user = await snapshot.getPromise(userState);
    const newAccounts = await getAccounts(user);
    if (!('error' in newAccounts)) {
      set(accountState, newAccounts.accounts);
    } else {
      set(accountState, []);
    }
  });
};

export const useRefreshAccountTypes = () => {
  return useRecoilCallback(({ set }) => async () => {
    const accountTypes = await getAccountType();
    if (!('error' in accountTypes)) {
      const types = accountTypes.reduce((items, accountType) => {
        items.push({ id: accountType, label: accountType });
        return items;
      }, []);

      set(accountTypeState, types);
    } else {
      set(accountTypeState, []);
    }
  });
};
