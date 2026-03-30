'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { UpdateAccountsArgsType } from '@findrey/lib/accounts';
import { getValue } from '@findrey/utils/accounts';

import { useAccountActions } from '../hooks/useAccountActions.hook';
import useAccountsPageContext from '../hooks/useAccounts.hook';

import styles from './editAccount.module.css';

function EditAccount() {
  const pathName = usePathname();
  const { accounts, accountTypes, isLoading, isError } =
    useAccountsPageContext();

  const [modifiedAccount, setModifiedAccount] =
    useState<UpdateAccountsArgsType>({
      id: '000000000000000000000000',
      bankName: '',
      accountNumber: '',
      accountName: '',
      accountType: '000000000000000000000000',
      balance: 0.0,
    });
  const updateAccount = useAccountActions();

  useEffect(() => {
    const selectedAccount = accounts?.data.filter(
      (account) => account.id === pathName?.split('/').pop(),
    )[0];

    if (selectedAccount?.id) {
      setModifiedAccount(selectedAccount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setModifiedAccount((prevAccount) => {
      const updatedAccount = {
        ...prevAccount,
        [name]: getValue(name as keyof UpdateAccountsArgsType, value),
      };

      if (name === 'bankName' || name === 'accountNumber') {
        updatedAccount.accountName = `${updatedAccount.bankName}-${updatedAccount.accountNumber}`;
      }

      return updatedAccount;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateAccount.mutateAsync(modifiedAccount);
  };

  if (updateAccount.isLoading || isLoading) {
    return <div>Loading....</div>;
  }
  if (updateAccount.isError || isError) {
    return <div>Error!!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="bankName">Bank Name</label>
          <input
            id="bankName"
            type="text"
            placeholder="Bank Name"
            name="bankName"
            value={modifiedAccount.bankName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="accountNumber">Account Number</label>
          <input
            id="accountNumber"
            type="text"
            placeholder="Account Number"
            name="accountNumber"
            value={modifiedAccount.accountNumber}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="accountName">Account Name</label>
          <input
            id="accountName"
            type="text"
            placeholder="Account Name"
            name="accountName"
            value={modifiedAccount.accountName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="accountType">Account Type</label>
          <select
            name="accountType"
            id="accountType"
            value={modifiedAccount.accountType}
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
          <label htmlFor="balance">Balance</label>
          <input
            id="balance"
            type="number"
            step="0.001"
            placeholder="Balance Amount"
            name="balance"
            value={modifiedAccount.balance}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditAccount;
