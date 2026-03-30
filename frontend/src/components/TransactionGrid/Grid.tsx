import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilValue } from 'recoil';
import { deleteTransaction } from '../../services/transactions';
import { userState } from '../../stores/atoms/States';
import { useRefreshAccounts } from '../../stores/selectors/AccountSelector';
import { useRefreshTransactions } from '../../stores/selectors/TransactionsSelector';
import { TransactionsType } from '../../types/Transactions';
import ConfirmModal from '../common/ConfirmModal';
import DateFilter from './DateFilter';
import TransactionsModal from './Modal';
import SearchBar from './Searchbar';

interface TransactionGrid {
  transactions: TransactionsType[];
}

function Grid(props: TransactionGrid) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [dateFilteredData, setDateFilteredData] = useState([]);
  const [searchFilteredData, setSearchFilteredData] = useState([]);

  const user = useRecoilValue<string>(userState);
  const refreshTransactions = useRefreshTransactions();
  const refreshAccounts = useRefreshAccounts();

  const deleteOldTransaction = async (transactionId: number) => {
    await deleteTransaction({
      transactionId: transactionId,
      user_id: user
    });
    refreshTransactions();
    refreshAccounts();
  };

  useEffect(() => {
    setDateFilteredData(
      props.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.transactionDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, props.transactions]);

  useEffect(() => {
    setSearchFilteredData(
      dateFilteredData.filter((row) => {
        const values = Object.values(row).map((value) => value.toString().toLowerCase());

        return values.some((value) => value.includes(searchTerm.toLowerCase()));
      })
    );
  }, [dateFilteredData, searchTerm]);

  return (
    <div className="p-2 m-2 border shadow-md border-sky-300 sm:rounded-lg">
      <div className="flex items-center justify-between pb-4">
        <DateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>

      <div className="relative h-[450px] overflow-y-scroll">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Type
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {searchFilteredData.map((transaction) => (
              <tr
                key={transaction.transactionId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{transaction.transactionType}</span>
                  </div>
                </th>
                <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{transaction.description}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(transaction.transactionDate).toLocaleString()}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{transaction.amount}</span>
                    <span className="text-xs text-gray-400">
                      {transaction.debitAccount && transaction.creditAccount
                        ? transaction.debitAccount + ' <-> ' + transaction.creditAccount
                        : transaction.debitAccount || transaction.creditAccount}
                    </span>
                  </div>
                </th>
                <td className="flex items-center justify-between px-6 py-1">
                  <TransactionsModal defaultValues={transaction} />
                  <ConfirmModal
                    text="Are you sure you want to delete this transaction?"
                    buttonLabel="Delete"
                    ifYes={() => deleteOldTransaction(transaction.transactionId)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TransactionsModal />
    </div>
  );
}

export default Grid;
