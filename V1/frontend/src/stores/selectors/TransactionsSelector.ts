import { useRecoilCallback } from 'recoil';
import { getTransactions } from '../../services/transactions';
import { transactionsState, userState } from '../atoms/States';

export const useRefreshTransactions = () => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const user = await snapshot.getPromise(userState);
    const transactions = await getTransactions(user);

    if (!('error' in transactions)) {
      transactions.transactions.sort(
        (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
      );

      // transactions.transactions.sort(function (a, b) {
      //   const date1: any = new Date(a.transactionDate);
      //   const date2: any = new Date(b.transactionDate);

      //   return date2 - date1;
      // });

      set(transactionsState, transactions.transactions);
    } else {
      set(transactionsState, []);
    }
  });
};
