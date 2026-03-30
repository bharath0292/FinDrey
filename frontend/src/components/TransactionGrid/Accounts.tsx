import { useRecoilValue } from 'recoil';
import { accountState } from '../../stores/atoms/States';
import { AccountType } from '../../types/Account';

function AccountsForm() {
  const accounts = useRecoilValue<AccountType[]>(accountState);

  const fetchAccounts = (accountType: string) => {
    const accountMapping = {
      cash: ['INHAND'],
      bankAccounts: ['BANK ACCOUNT'],
      creditCard: ['CREDIT CARD'],
      wallet: ['WALLET'],
      others: ['INHAND', 'BANK ACCOUNT', 'CREDIT CARD', 'WALLET']
    };

    const listAccounts = accounts.filter((account) =>
      accountType === 'others'
        ? !accountMapping[accountType].includes(account.account_type)
        : accountMapping[accountType].includes(account.account_type)
    );

    return listAccounts.map((account) => (
      <div key={account.id} className="flex items-center justify-between max-w-md p-2 bg-white">
        <div className="text-sm font-semibold text-gray-700">{account.id}</div>
        <div className="text-sm text-teal-500">{Number(account.balance).toFixed(2)}</div>
      </div>
    ));
  };

  return (
    <div className="p-4 m-2 border border-gray-200 rounded-md shadow-md">
      <div>
        <h6 className="text-xs border-b">Cash</h6>
        {accounts.length > 0 && fetchAccounts('cash')}
      </div>
      <div>
        <h6 className="text-xs border-b">Bank Accounts</h6>
        {accounts.length > 0 && fetchAccounts('bankAccounts')}
      </div>
      <div>
        <h6 className="text-xs border-b">Credit Cards</h6>
        {accounts.length > 0 && fetchAccounts('creditCard')}
      </div>
      <div>
        <h6 className="text-xs border-b">Wallets</h6>
        {accounts.length > 0 && fetchAccounts('wallet')}
      </div>
      <div>
        <h6 className="text-xs border-b">Others</h6>
        {accounts.length > 0 && fetchAccounts('others')}
      </div>
    </div>
  );
}

export default AccountsForm;
