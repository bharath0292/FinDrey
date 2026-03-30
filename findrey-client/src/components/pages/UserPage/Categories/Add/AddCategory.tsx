'use client';

import { useState } from 'react';

import { AddCategoriesArgsType } from '@findrey/lib/categories';
import useCategoryPageContext from '@findrey/components/pages/UserPage/Categories/hooks/useCategory.hook';
import { convertToTitleCase } from '@findrey/utils/utilities';

import { useCategoryActions } from '../hooks/useCategoryActions.hook';

import styles from './addCategory.module.css';

function AddCategory() {
  const { userId, transactionTypes, isLoading, isError } =
    useCategoryPageContext();
  const defaultValue = {
    userId: userId,
    category: '',
    transactionType: '',
  };

  const createCategory = useCategoryActions(() => setNewCategory(defaultValue));

  const [newCategory, setNewCategory] =
    useState<AddCategoriesArgsType>(defaultValue);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setNewCategory((prevCategory) => {
      const updatedAccount = {
        ...prevCategory,
        [name]: convertToTitleCase(value),
      };

      return updatedAccount;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createCategory.mutateAsync(newCategory);
  };

  if (isLoading || createCategory.isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return <div>Error!!</div>;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.longInput}
          type="text"
          placeholder="Category"
          name="category"
          value={newCategory.category}
          onChange={handleInputChange}
          required
        />
        <select
          className={styles.longInput}
          name="transactionType"
          id="transactionType"
          value={newCategory.transactionType}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCategory;
