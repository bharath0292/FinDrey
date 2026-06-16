import { useEffect, useState } from 'react';

import useCategoryPageContext from '@findrey/components/pages/UserPage/Categories/hooks/useCategory.hook';
import type { UpdateCategoriesArgsType } from '@findrey/lib/categories';
import { convertToTitleCase } from '@findrey/utils/utilities';

import { useRouterState } from '@tanstack/react-router';

import { useCategoryActions } from '../hooks/useCategoryActions.hook';
import styles from './editCategory.module.css';

function EditCategory() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const categoryId = pathname?.split('/').pop();
  const { categories, transactionTypes, isLoading, isError } =
    useCategoryPageContext();

  const [modifiedCategory, setModifiedCategory] =
    useState<UpdateCategoriesArgsType>({} as UpdateCategoriesArgsType);
  const updateCategory = useCategoryActions();

  useEffect(() => {
    const selectedCategory = categories?.data.find((c) => c.id === categoryId);
    if (selectedCategory?.id) {
      setModifiedCategory(selectedCategory);
    }
  }, [categories, categoryId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setModifiedCategory((prev) => ({ ...prev, [name]: convertToTitleCase(value) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateCategory.mutateAsync(modifiedCategory);
  };

  if (updateCategory.isLoading || isLoading) {
    return <div>Loading....</div>;
  }
  if (updateCategory.isError || isError) {
    return <div>Error!!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="category">Category Name</label>
          <input
            id="category"
            type="text"
            placeholder="Category Name"
            name="category"
            value={modifiedCategory.category}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="transactionType">Transaction Type</label>
          <select
            name="transactionType"
            id="transactionType"
            value={modifiedCategory.transactionType}
            onChange={handleInputChange}
            required
          >
            <option value="000000000000000000000000" disabled hidden>
              Transaction Type
            </option>
            {transactionTypes?.data.map((transactionType) => (
              <option key={transactionType.id} value={transactionType.id}>
                {transactionType.transactionType}
              </option>
            ))}
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
