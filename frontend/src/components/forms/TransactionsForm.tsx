import { useRecoilValue } from 'recoil';
import { transactionsState } from '../../stores/atoms/States';
import { TransactionsType } from '../../types/Transactions';
import AccountForm from '../TransactionGrid/Accounts';
import Grid from '../TransactionGrid/Grid';

function TransactionsForm() {
  const transactions = useRecoilValue<TransactionsType[]>(transactionsState);

  return (
    <div className="flex flex-wrap">
      <div className="w-full p-2 md:w-1/4">
        <AccountForm />
      </div>
      <div className="w-full p-2 md:w-3/4">
        <Grid transactions={transactions} />
      </div>
    </div>
  );
}

export default TransactionsForm;
