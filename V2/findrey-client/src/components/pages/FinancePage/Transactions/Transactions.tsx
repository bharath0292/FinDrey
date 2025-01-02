'use client';

import { MouseEvent } from 'react';
import Link from 'next/link';

import Pagination from '@findrey/components/ui/Pagination';
import Search from '@findrey/components/ui/Search';
import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { getValueById } from '@findrey/utils/utilities';

import { useTransactionActions } from './hooks/useTransactionActions.hook';
import useTransactionsPageContext from './hooks/useTransactions.hook';
import styles from './transactions.module.css';

function TransactionsPage() {
  const {
    isLoading,
    isError,
    transactions,
    transactionTypes,
    categories,
    accounts,
  } = useTransactionsPageContext();
  const deleteTransaction = useTransactionActions();

  const formatTransactionAccount = (credit: string, debit: string) => {
    const creditAccount = getValueById(credit, accounts?.data)?.accountName;
    const debitAccount = getValueById(debit, accounts?.data)?.accountName;
    let result = '';

    if (creditAccount && debitAccount) {
      result += `${debitAccount}->${creditAccount}`;
    } else if (creditAccount) {
      result += `${creditAccount}`;
    } else if (debitAccount) {
      result += `${debitAccount}`;
    }

    return result;
  };

  const handleDeleteClick = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    await deleteTransaction.mutateAsync(id);
  };

  if (isError) {
    return <div>Error!!!</div>;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.top}>
          <Search placeholder="Search..." />
          <Link href="/finance/transactions/add">
            <button className={styles.addButton}>Add new</button>
          </Link>
        </div>

        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>Transaction Date</th>
              <th>Transaction Type</th>
              <th>Transaction Account</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading || deleteTransaction.isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            ) : (
              transactions?.data.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    {
                      new Date(transaction.transactionDate)
                        .toISOString()
                        .split('T')[0]
                    }
                  </td>
                  <td>
                    {
                      getValueById(
                        transaction.transactionType,
                        transactionTypes?.data,
                      )?.transactionType
                    }
                  </td>
                  <td>
                    {formatTransactionAccount(
                      transaction.creditAccount,
                      transaction.debitAccount,
                    )}
                  </td>
                  <td>
                    {
                      getValueById(transaction.category, categories?.data)
                        ?.category
                    }
                  </td>

                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/finance/transactions/${transaction.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          View
                        </button>
                      </Link>
                      <form>
                        <input type="hidden" name="id" value={transaction.id} />
                        <button
                          onClick={(e) => handleDeleteClick(e, transaction.id)}
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
        <Pagination count={transactions?.count} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </div>
  );
}

export default TransactionsPage;
