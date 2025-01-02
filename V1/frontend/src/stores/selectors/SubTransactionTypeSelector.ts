import { useRecoilCallback } from 'recoil';
import { getSubTransactionType } from '../../services/subTransactionType';
import { subTransactionTypeState } from '../atoms/States';

export const useRefreshSubTransactionType = () => {
  return useRecoilCallback(({ set }) => async () => {
    const subTransactionTypes = await getSubTransactionType();

    if (!('error' in subTransactionTypes)) {
      const items = subTransactionTypes.reduce((items, category) => {
        items.push(category);
        return items;
      }, []);
      // items.sort((a, b) => a.id.localeCompare(b.id));
      set(subTransactionTypeState, items);
    } else {
      set(subTransactionTypeState, []);
    }
  });
};
