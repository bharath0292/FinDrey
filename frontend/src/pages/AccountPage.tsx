import AccountForm from '../components/forms/AccountForm';
import AccountList from '../components/forms/AccountListForm';

function AccountPage() {
  return (
    <>
      <AccountForm />
      <AccountList editable={true} />
    </>
  );
}

export default AccountPage;
