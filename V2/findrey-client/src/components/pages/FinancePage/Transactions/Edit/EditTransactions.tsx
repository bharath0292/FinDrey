'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { UpdateTransactionsArgsType } from '@findrey/lib/transactions';

import { useTransactionActions } from '../hooks/useTransactionActions.hook';
import useTransactionsPageContext from '../hooks/useTransactions.hook';

import styles from './editTransactions.module.css';

function EditTransactions() {
  const pathName = usePathname();
  const {
    transactionTypes,
    isLoading,
    isError,
    subTransactionTypes,
    accounts,
    categories,
    transactions,
  } = useTransactionsPageContext();
  const [modifiedTransaction, setModifiedTransaction] =
    useState<UpdateTransactionsArgsType>({
      id: '000000000000000000000000',
      transactionDate: new Date().toISOString(),
      transactionType: '000000000000000000000000',
      subTransactionType: '000000000000000000000000',
      debitAccount: '000000000000000000000000',
      creditAccount: '000000000000000000000000',
      category: '000000000000000000000000',
      description: '',
      amount: 0.0,
    });
  const updateTransaction = useTransactionActions();

  useEffect(() => {
    const selectedTransaction = transactions?.data.filter(
      (transaction) => transaction.id === pathName?.split('/').pop(),
    )[0];

    if (selectedTransaction?.id) {
      setModifiedTransaction(selectedTransaction);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setModifiedTransaction((prevTransaction) => {
      const updatedAccount = {
        ...prevTransaction,
        [name]: value,
      };
      return updatedAccount;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateTransaction.mutateAsync(modifiedTransaction);
  };

  if (updateTransaction.isLoading || isLoading) {
    return <div>Loading....</div>;
  }
  if (updateTransaction.isError || isError) {
    return <div>Error!!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label htmlFor="transactionDate">Transaction Date</label>
          <input
            type="datetime-local"
            name="transactionDate"
            placeholder="Transaction Date"
            value={modifiedTransaction.transactionDate?.slice(0, 16)}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="transactionType">Transaction Type</label>
          <select
            name="transactionType"
            id="transactionType"
            value={modifiedTransaction.transactionType}
            onChange={handleInputChange}
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

          <label htmlFor="subTransactionType">Sub Transaction Type</label>
          <select
            name="subTransactionType"
            id="subTransactionType"
            value={modifiedTransaction.subTransactionType}
            onChange={handleInputChange}
          >
            <option value="000000000000000000000000" disabled hidden>
              Sub Transaction Type
            </option>
            {subTransactionTypes?.data.map(
              (subTransactionType) =>
                subTransactionType.transactionType ===
                  modifiedTransaction.transactionType && (
                  <option
                    key={subTransactionType.id}
                    value={subTransactionType.id}
                  >
                    {subTransactionType.subTransactionType}
                  </option>
                ),
            )}
          </select>

          <label htmlFor="debitAccount">Debit Account</label>
          <select
            name="debitAccount"
            id="debitAccount"
            value={modifiedTransaction.debitAccount}
            onChange={handleInputChange}
          >
            <option value="000000000000000000000000" disabled hidden>
              Debit Account
            </option>
            {accounts?.data.map(
              (account) =>
                account.id !== modifiedTransaction.creditAccount && (
                  <option key={account.id} value={account.id}>
                    {account.accountName}
                  </option>
                ),
            )}
          </select>

          <label htmlFor="creditAccount">Credit Account</label>
          <select
            name="creditAccount"
            id="creditAccount"
            value={modifiedTransaction.creditAccount}
            onChange={handleInputChange}
          >
            <option value="000000000000000000000000" disabled hidden>
              Credit Account
            </option>
            {accounts?.data.map(
              (account) =>
                account.id !== modifiedTransaction.debitAccount && (
                  <option key={account.id} value={account.id}>
                    {account.accountName}
                  </option>
                ),
            )}
          </select>

          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={modifiedTransaction.category}
            onChange={handleInputChange}
          >
            <option value="000000000000000000000000" disabled hidden>
              Category
            </option>
            {categories?.data.map(
              (category) =>
                category.transactionType ===
                  modifiedTransaction.transactionType && (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ),
            )}
          </select>

          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="description"
            placeholder="Description"
            name="description"
            value={modifiedTransaction.description}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            step="0.001"
            placeholder="Amount"
            name="amount"
            value={modifiedTransaction.amount || 0.0}
            onChange={handleInputChange}
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTransactions;
