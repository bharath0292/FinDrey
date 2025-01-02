'use client';

import { useState } from 'react';

import { AddAccountsArgsType } from '@findrey/lib/accounts';
import { useAccountActions } from '@findrey/components/pages/UserPage/Accounts/hooks/useAccountActions.hook';
import useAccountsPageContext from '@findrey/components/pages/UserPage/Accounts/hooks/useAccounts.hook';
import { getValue } from '@findrey/utils/accounts';

import styles from './addAccount.module.css';

function AddAccount() {
  const { userId, accountTypes, isLoading, isError } = useAccountsPageContext();
  const defaultValue = {
    userId: userId,
    bankName: '',
    accountNumber: '',
    accountName: '',
    accountType: '000000000000000000000000',
    balance: 0.0,
  };

  const createAccount = useAccountActions(() => setNewAccount(defaultValue));

  const [newAccount, setNewAccount] =
    useState<AddAccountsArgsType>(defaultValue);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setNewAccount((prevAccount) => {
      const updatedAccount = {
        ...prevAccount,
        [name]: getValue(name as keyof AddAccountsArgsType, value),
      };

      if (name === 'bankName' || name === 'accountNumber') {
        updatedAccount.accountName = `${updatedAccount.bankName}-${updatedAccount.accountNumber}`;
      }

      return updatedAccount;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createAccount.mutateAsync(newAccount);
  };

  if (isLoading || createAccount.isLoading) {
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
          placeholder="Bank Name"
          name="bankName"
          value={newAccount.bankName}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.longInput}
          type="text"
          placeholder="Account Number"
          name="accountNumber"
          value={newAccount.accountNumber}
          onChange={handleInputChange}
          required
        />
        <input
          className={styles.longInput}
          type="text"
          placeholder="Account Name"
          name="accountName"
          value={newAccount.accountName}
          onChange={handleInputChange}
          required
        />
        <select
          className={styles.longInput}
          name="accountType"
          id="accountType"
          value={newAccount.accountType}
          onChange={handleInputChange}
          required
        >
          <option value="000000000000000000000000" disabled hidden>
            Account Type
          </option>
          {accountTypes?.data.map((accountType) => (
            <option key={accountType.id} value={accountType.id}>
              {accountType.accountType}
            </option>
          ))}
        </select>
        <input
          className={styles.longInput}
          type="number"
          step="0.001"
          placeholder="Balance Amount"
          name="balance"
          value={newAccount.balance}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddAccount;
