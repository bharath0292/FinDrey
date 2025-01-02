'use client';

import { useMutation, useQueryClient } from 'react-query';

import {
  AddCategoriesArgsType,
  addCategory,
  deleteCategory,
  UpdateCategoriesArgsType,
  updateCategory,
} from '@findrey/lib/categories';

type CategoryActionType =
  | AddCategoriesArgsType
  | UpdateCategoriesArgsType
  | string;

const determineAction = (categoryAction: CategoryActionType) => {
  if (typeof categoryAction === 'string') {
    return () => deleteCategory(categoryAction);
  } else if ('id' in categoryAction) {
    return () => updateCategory(categoryAction as UpdateCategoriesArgsType);
  } else {
    return () => addCategory(categoryAction as AddCategoriesArgsType);
  }
};

export const useCategoryActions = (
  onSuccess: (() => void) | undefined = undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (category: CategoryActionType) => {
      const action = determineAction(category);
      return action();
    },
    {
      onSuccess: () => {
        if (onSuccess) {
          onSuccess();
        }
        queryClient.invalidateQueries({ queryKey: ['categories', '', 1] });
      },
    },
  );
};
