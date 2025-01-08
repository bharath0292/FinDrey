'use client';

import { MouseEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Pagination from '@findrey/components/ui/Pagination';
import Search from '@findrey/components/ui/Search';
import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { useTransactionsState } from '@findrey/store';
import { getValueById } from '@findrey/utils/utilities';

import { useTransactionActions } from './hooks/useTransactionActions.hook';
import useTransactionsPageContext from './hooks/useTransactions.hook';
import styles from './transactions.module.css';

function TransactionsPage() {
  const {
    isLoading,
    isError,
    transactionTypeItems,
    categoryItems,
    creditAccountsItems,
    debitAccountsItems,
    userId,
  } = useTransactionsPageContext();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams || undefined);

  const pageNumber = Number(params.get('page')) || 1;
  const searchQuery = params.get('query') ?? '';

  const {
    data: transactions,
    isError: isTransactionsError,
    isLoading: isTransactionsLoading,
  } = useTransactionsState(userId, pageNumber, searchQuery);

  const deleteTransaction = useTransactionActions();

  const formatTransactionAccount = (credit: string, debit: string) => {
    const creditAccount = getValueById(credit, creditAccountsItems)?.label;
    const debitAccount = getValueById(debit, debitAccountsItems)?.label;
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

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError || isTransactionsError) {
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
            {isTransactionsLoading || deleteTransaction.isLoading ? (
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
                        transactionTypeItems,
                      )?.label
                    }
                  </td>
                  <td>
                    {formatTransactionAccount(
                      transaction.creditAccount,
                      transaction.debitAccount,
                    )}
                  </td>
                  <td>
                    {getValueById(transaction.category, categoryItems)?.label}
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
