'use client';

import Link from 'next/link';

import Pagination from '@findrey/components/ui/Pagination';
import Search from '@findrey/components/ui/Search';
import { ITEMS_PER_PAGE } from '@findrey/constants/gridConfigs';

import styles from './accounts.module.css';
import { useAccountActions } from './hooks/useAccountActions.hook';
import useAccountsPageContext from './hooks/useAccounts.hook';

function AccountsPage() {
  const { isLoading, isError, accounts, accountTypes } =
    useAccountsPageContext();
  const deleteAccount = useAccountActions();

  const getAccountTypeById = (id: string) => {
    const accountType = accountTypes?.data?.find((type) => type.id === id);
    return accountType?.accountType ?? '';
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
          <Search placeholder="Search for a accounts" />
          <Link href="/user/accounts/add">
            <button className={styles.addButton}>Add new</button>
          </Link>
        </div>

        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Current Balance</th>
              <th>Action</th>
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
              accounts?.data.map((account) => (
                <tr key={account.id}>
                  <td>{account.accountName}</td>
                  <td>{getAccountTypeById(account.accountType)}</td>
                  <td>{account.balance}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/user/accounts/${account.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>
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
              ))
            )}
          </tbody>
        </table>
        <Pagination count={accounts?.count} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </div>
  );
}

export default AccountsPage;
