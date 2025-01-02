import { useEffect } from 'react';
import AccountForm from '../components/forms/AccountForm';
import TransactionsForm from '../components/forms/TransactionsForm';
import { useRefreshAccounts, useRefreshAccountTypes } from '../stores/selectors/AccountSelector';
import { useRefreshCategory } from '../stores/selectors/CategorySelector';
import { useRefreshSubTransactionType } from '../stores/selectors/SubTransactionTypeSelector';
import { useRefreshTransactions } from '../stores/selectors/TransactionsSelector';
import { useRefreshTransactionType } from '../stores/selectors/TransactionTypeSelector';
function HomePage() {
  const refreshCategory = useRefreshCategory();
  const refreshAccounts = useRefreshAccounts();
  const refreshTransactionType = useRefreshTransactionType();
  const refreshSubTransactionType = useRefreshSubTransactionType();
  const refreshAccountTypes = useRefreshAccountTypes();
  const refreshTransactions = useRefreshTransactions();

  useEffect(() => {
    refreshTransactions();
    refreshCategory();
    refreshAccounts();
    refreshAccountTypes();
    refreshTransactionType();
    refreshSubTransactionType();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TransactionsForm />
      <AccountForm />
    </>
  );
}

export default HomePage;
