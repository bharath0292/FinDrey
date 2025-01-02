import { useRecoilCallback } from 'recoil';
import { getTransactionType } from '../../services/transactionType';
import { transactionTypeState } from '../atoms/States';

export const useRefreshTransactionType = () => {
  return useRecoilCallback(({ set }) => async () => {
    const transactionTypes = await getTransactionType();

    if (!('error' in transactionTypes)) {
      const items = transactionTypes.reduce((items, category) => {
        items.push({ id: category, label: category });
        return items;
      }, []);
      items.sort((a, b) => a.id.localeCompare(b.id));
      set(transactionTypeState, items);
    } else {
      set(transactionTypeState, []);
    }
  });
};
