'use client';

import { Fragment } from 'react';
import Link from 'next/link';

import Pagination from '@findrey/components/ui/Pagination';
import Search from '@findrey/components/ui/Search';
import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';
import { AccountType } from '@findrey/types';

import styles from './accounts.module.css';
import { useAccountActions } from './hooks/useAccountActions.hook';
import useAccountsPageContext from './hooks/useAccounts.hook';

function AccountsPage() {
  const { isLoading, isError, accounts, accountTypes } =
    useAccountsPageContext();
  const deleteAccount = useAccountActions();

  const getAccountTypeById = (id: string) => {
    const accountType = accountTypes?.data?.find((type) => type.id === id);
    return accountType?.accountType ?? 'Unknown';
  };

  const groupAccountsByType = () => {
    if (!accounts?.data) return {};

    return accounts.data.reduce(
      (groups: { [key: string]: AccountType[] }, account) => {
        const type = getAccountTypeById(account.accountType);
        if (!groups[type]) {
          groups[type] = [];
        }
        groups[type].push(account);
        return groups;
      },
      {},
    );
  };

  const handleDeleteClick = async (id: string) => {
    await deleteAccount.mutateAsync(id);
  };

  if (isError || deleteAccount.isError) {
    return <div>Error!!!</div>;
  }

  const groupedAccounts = groupAccountsByType();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.top}>
          <Search placeholder="Search for accounts" />
          <Link href="/user/accounts/add">
            <button className={styles.addButton}>Add new</button>
          </Link>
        </div>

        {isLoading || deleteAccount.isLoading ? (
          <div style={{ textAlign: 'center' }}>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr>
                <th>Account Name</th>
                <th>Current Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedAccounts).map((accountType) => (
                <Fragment key={accountType}>
                  {/* Group Header */}
                  <tr className={styles.groupRow}>
                    <td colSpan={4} className={styles.groupTitle}>
                      {accountType}
                    </td>
                  </tr>
                  {/* Accounts in the Group */}
                  {groupedAccounts[accountType].map((account) => (
                    <tr key={account.id}>
                      <td>{account.accountName}</td>
                      <td>{account.balance.toFixed(2)}</td>
                      <td>
                        <div className={styles.buttons}>
                          <Link href={`/user/accounts/${account.id}`}>
                            <button
                              className={`${styles.button} ${styles.view}`}
                            >
                              View
                            </button>
                          </Link>
                          <form>
                            <input type="hidden" name="id" value={account.id} />
                            <button
                              onClick={() => handleDeleteClick(account.id)}
                              type="button"
                              className={`${styles.button} ${styles.delete}`}
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
        <Pagination count={accounts?.count} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </div>
  );
}

export default AccountsPage;
