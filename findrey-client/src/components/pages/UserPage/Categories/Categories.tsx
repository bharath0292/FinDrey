'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import Pagination from '@findrey/components/ui/Pagination';
import Search from '@findrey/components/ui/Search';
import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import useCategoryPageContext from '@findrey/components/pages/UserPage/Categories/hooks/useCategory.hook';

import styles from './categories.module.css';
import { useCategoryActions } from './hooks/useCategoryActions.hook';

function CategoriesPage() {
  const { isLoading, isError, categories, transactionTypes, userId } =
    useCategoryPageContext();
  const deleteAccount = useCategoryActions();

  const userCategories = useMemo(
    () => categories?.data.filter((category) => category.userId === userId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories],
  );

  const getTransactionTypeById = (id: string) => {
    const transactionType = transactionTypes?.data?.find(
      (type) => type.id === id,
    );
    return transactionType?.transactionType ?? '';
  };

  const handleDeleteClick = async (id: string) => {
    await deleteAccount.mutateAsync(id);
  };

  if (isError || deleteAccount.isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.top}>
          <Search placeholder="Search for a categories" />
          <Link href="/user/categories/add">
            <button className={styles.addButton}>Add new</button>
          </Link>
        </div>

        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>Category</th>
              <th>Transaction Type</th>
            </tr>
          </thead>

          <tbody>
            {isLoading || deleteAccount.isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            ) : (
              userCategories?.map((category) => (
                <tr key={category.id}>
                  <td>{category.category}</td>
                  <td>{getTransactionTypeById(category.transactionType)}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/user/categories/${category.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <form>
                        <input type="hidden" name="id" value={category.id} />
                        <button
                          onClick={() => handleDeleteClick(category.id)}
                          type="button"
                          className={`${styles.button} ${styles.delete}`}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination count={categories?.count} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </div>
  );
}

export default CategoriesPage;
