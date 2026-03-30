import { useRecoilCallback } from 'recoil';
import { getCategory } from '../../services/category';
import { categoryState, userState } from '../atoms/States';

export const useRefreshCategory = () => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const user = await snapshot.getPromise(userState);
    const categories = await getCategory(user);

    if (!('error' in categories)) {
      const items = categories.reduce((items, category) => {
        items.push({ id: category, label: category });
        return items;
      }, []);

      items.sort((a, b) => a.id.localeCompare(b.id));

      set(categoryState, items);
    } else {
      set(categoryState, []);
    }
  });
};
