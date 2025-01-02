'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { UpdateCategoriesArgsType } from '@findrey/lib/categories';
import useCategoryPageContext from '@findrey/components/pages/UserPage/Categories/hooks/useCategory.hook';
import { convertToTitleCase } from '@findrey/utils/utilities';

import { useCategoryActions } from '../hooks/useCategoryActions.hook';

import styles from './editCategory.module.css';

function EditCategory() {
  const pathName = usePathname();
  const { categories, transactionTypes, isLoading, isError } =
    useCategoryPageContext();

  const [modifiedCategory, setModifiedCategory] =
    useState<UpdateCategoriesArgsType>({} as UpdateCategoriesArgsType);
  const updateCategory = useCategoryActions();

  useEffect(() => {
    const selectedCategory = categories?.data.filter(
      (category) => category.id === pathName?.split('/').pop(),
    )[0];

    if (selectedCategory?.id) {
      setModifiedCategory(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setModifiedCategory((prevAccount) => {
      const updateCategory = {
        ...prevAccount,
        [name]: convertToTitleCase(value),
      };
      return updateCategory;
    });
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
          <label htmlFor="category">Bank Name</label>
          <input
            id="category"
            type="text"
            placeholder="Bank Name"
            name="category"
            value={modifiedCategory.category}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="transactionType">Account Type</label>
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
