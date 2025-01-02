import { createRef, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addTransaction, updateTransaction } from '../../services/transactions';
import {
  categoryState,
  subTransactionTypeState,
  transactionTypeState,
  transactionsState,
  userState
} from '../../stores/atoms/States';
import { accountSelector, useRefreshAccounts } from '../../stores/selectors/AccountSelector';
import { useRefreshTransactions } from '../../stores/selectors/TransactionsSelector';
import { ItemType } from '../../types/Item';
import { TransactionsType } from '../../types/Transactions';
import {
  SubTransactionType as SubTransactionTypeEnums,
  TransactionType as TransactionTypeEnums
} from '../../types/common/enums';
import Button from '../common/Button';
import Datepicker, { DatePickerRefType } from '../common/Datepicker';
import Dropdown, { FieldState, type DropdownRefType } from '../common/Dropdown';
import Input, { type InputRefType } from '../common/Input';
import CategoryModal from './CategoryModal';

interface TransactionsModalProps {
  defaultValues?: TransactionsType;
}

function TransactionsModal(props: TransactionsModalProps) {
  const {
    transactionDate,
    transactionType,
    subTransactionType,
    debitAccount,
    creditAccount,
    category,
    description,
    amount
  } = props.defaultValues || {
    transactionDate: '',
    transactionType: '',
    subTransactionType: '',
    debitAccount: '',
    creditAccount: '',
    category: '',
    description: '',
    amount: ''
  };

  const [localTransactionType, setLocalTransactionType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const transactionDateRef = createRef<DatePickerRefType>();
  const transactionTypeRef = createRef<DropdownRefType>();
  const subTransactionTypeRef = createRef<DropdownRefType>();
  const debitAccountRef = createRef<DropdownRefType>();
  const creditAccountRef = createRef<DropdownRefType>();
  const categoryRef = createRef<DropdownRefType>();
  const descriptionRef = createRef<InputRefType>();
  const amountRef = createRef<InputRefType>();

  const [debitAccountDisable, setDebitAccountDisable] = useState<boolean>(true);
  const [creditAccountDisable, setCreditAccountDisable] = useState<boolean>(true);
  const [categoryDisable, setCategoryDisable] = useState<boolean>(true);
  const [descriptionDisable, setDescriptionDisable] = useState<boolean>(true);

  const [transactionDateFieldState, setTransactionDateFieldState] = useState<FieldState>('info');
  const [transactionTypeFieldState, setTransactionTypeFieldState] = useState<FieldState>('info');
  const [subTransactionTypeFieldState, setSubTransactionTypeFieldState] = useState<FieldState>('info');
  const [debitAccountFieldState, setDebitAccountFieldState] = useState<FieldState>('info');
  const [creditAccountFieldState, setCreditAccountFieldState] = useState<FieldState>('info');
  const [categoryFieldState, setCategoryFieldState] = useState<FieldState>('info');
  const [descriptionFieldState, setDescriptionFieldState] = useState<FieldState>('info');
  const [amountFieldState, setAmountFieldState] = useState<FieldState>('info');

  const user = useRecoilValue<string>(userState);
  const accountsItem = useRecoilValue(accountSelector);
  const categoriesItem = useRecoilValue(categoryState);
  const transactionTypesItem = useRecoilValue(transactionTypeState);
  const subTransactionTypes = useRecoilValue(subTransactionTypeState);
  const [transactions, setTransactions] = useRecoilState(transactionsState);

  const subTransactionTypesItem = subTransactionTypes.reduce((items, category) => {
    if (localTransactionType === category.transaction_type) {
      items.push({ id: category.sub_transaction_type, label: category.sub_transaction_type });
    }
    return items.sort((a, b) => a.id.localeCompare(b.id));
  }, []);

  const transactionDescriptions = transactions.reduce((description: ItemType[], transaction) => {
    const existingDescription = description.find((description) => description.id === transaction.description);
    if (!existingDescription) {
      description.push({ id: transaction.description, label: transaction.description });
    }
    return description;
  }, []);

  const refreshAccounts = useRefreshAccounts();
  const refreshTransactions = useRefreshTransactions();

  const handleShow = () => {
    setShowModal(!showModal);
  };

  const resetForm = () => {
    setLocalTransactionType('');
    setErrorMessage('');

    setDebitAccountDisable(true);
    setCreditAccountDisable(true);
    setCategoryDisable(true);
    setDescriptionDisable(true);

    setTransactionDateFieldState('info');
    setTransactionTypeFieldState('info');
    setSubTransactionTypeFieldState('info');
    setDebitAccountFieldState('info');
    setCreditAccountFieldState('info');
    setCategoryFieldState('info');
    setDescriptionFieldState('info');
    setAmountFieldState('info');
  };

  const clearAccountFields = async () => {
    debitAccountRef.current.clearComponent();
    creditAccountRef.current.clearComponent();

    setDebitAccountFieldState('info');
    setCreditAccountFieldState('info');
  };

  const clearAllFields = async () => {
    if (subTransactionTypeRef.current) {
      subTransactionTypeRef.current.clearComponent();
      setSubTransactionTypeFieldState('info');
    }
    categoryRef.current.clearComponent();
    descriptionRef.current.clearComponent();

    setCategoryFieldState('info');
    setDescriptionFieldState('info');

    clearAccountFields();
  };

  const validateForm = () => {
    let validationSuccess = true;

    if (transactionDateRef.current && !transactionDateRef.current.value) {
      setTransactionDateFieldState('error');
      validationSuccess = false;
    } else {
      setTransactionDateFieldState('info');
    }

    if (transactionTypeRef.current && !transactionTypeRef.current.value) {
      setTransactionTypeFieldState('error');
      validationSuccess = false;
    } else {
      setTransactionTypeFieldState('info');
    }

    if (subTransactionTypesItem.length > 0 && subTransactionTypeRef.current && !subTransactionTypeRef.current.value) {
      setSubTransactionTypeFieldState('error');
      validationSuccess = false;
    } else {
      setSubTransactionTypeFieldState('info');
    }

    if (!debitAccountDisable && debitAccountRef.current && !debitAccountRef.current.value) {
      setDebitAccountFieldState('error');
      validationSuccess = false;
    } else {
      setDebitAccountFieldState('info');
    }

    if (!creditAccountDisable && creditAccountRef.current && !creditAccountRef.current.value) {
      setCreditAccountFieldState('error');
      validationSuccess = false;
    } else {
      setCreditAccountFieldState('info');
    }

    if (!categoryDisable && categoryRef.current && !categoryRef.current.value) {
      setCategoryFieldState('error');
      validationSuccess = false;
    } else {
      setCategoryFieldState('info');
    }

    if (!descriptionDisable && descriptionRef.current && !descriptionRef.current.value) {
      setDescriptionFieldState('error');
      validationSuccess = false;
    } else {
      setDescriptionFieldState('info');
    }

    if (amountRef.current && !amountRef.current.value) {
      setAmountFieldState('error');
      validationSuccess = false;
    } else {
      setAmountFieldState('info');
    }

    return validationSuccess;
  };

  const addNewTransaction = async () => {
    if (!validateForm()) {
      return;
    }

    const newTransaction = await addTransaction({
      user_id: user,
      transactionDate: transactionDateRef.current.value,
      transactionType: transactionTypeRef.current.value,
      subTransactionType: subTransactionTypeRef.current ? subTransactionTypeRef.current.value : '',
      debitAccount: debitAccountRef.current ? debitAccountRef.current.value : '',
      creditAccount: creditAccountRef.current ? creditAccountRef.current.value : '',
      category: categoryRef.current ? categoryRef.current.value : '',
      description: descriptionRef.current ? descriptionRef.current.value : '',
      amount: Number(amountRef.current.value)
    });

    if ('error' in newTransaction) {
      setErrorMessage(newTransaction.error);
      return;
    }

    setTransactions([...[newTransaction], ...transactions]);

    setShowModal(false);

    refreshAccounts();

    resetForm();
  };

  const updateOldTransaction = async () => {
    const updatedTransaction = await updateTransaction({
      transactionId: props.defaultValues.transactionId,
      user_id: user,
      transactionDate: transactionDateRef.current.value,
      transactionType: transactionTypeRef.current.value,
      subTransactionType: subTransactionTypeRef.current ? subTransactionTypeRef.current.value : '',
      debitAccount: debitAccountRef.current ? debitAccountRef.current.value : '',
      creditAccount: creditAccountRef.current ? creditAccountRef.current.value : '',
      category: categoryRef.current ? categoryRef.current.value : '',
      description: descriptionRef.current ? descriptionRef.current.value : '',
      amount: Number(amountRef.current.value)
    });

    if ('error' in updatedTransaction) {
      setErrorMessage(updatedTransaction.error);
      return;
    }

    setShowModal(false);
    refreshTransactions();
    refreshAccounts();

    resetForm();
  };

  const handleTransactionTypeChange = async () => {
    let type: string;

    if (!props.defaultValues) {
      await clearAllFields();
      type = transactionTypeRef.current.value;
    } else {
      type = props.defaultValues.transactionType;
    }

    setLocalTransactionType(type);

    if (type === TransactionTypeEnums.ATM_WITHDRAWAL) {
      descriptionRef.current.updateValue('ATM Withdrawal');
      creditAccountRef.current.updateValue('CASH');

      setCreditAccountDisable(true);
      setDebitAccountDisable(false);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.CASH_RECIEVED) {
      descriptionRef.current.updateValue('Cash Recieved from');
      creditAccountRef.current.updateValue('CASH');

      setCreditAccountDisable(true);
      setDebitAccountDisable(true);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.CASHBACK) {
      descriptionRef.current.updateValue('Cashback recieved for');

      setCreditAccountDisable(false);
      setDebitAccountDisable(true);
      setCategoryDisable(false);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.DEBT || type === TransactionTypeEnums.LEND) {
      setCreditAccountDisable(true);
      setDebitAccountDisable(true);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.EXPENSE) {
      setCreditAccountDisable(true);
      setDebitAccountDisable(false);
      setCategoryDisable(false);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.INCOME) {
      setCreditAccountDisable(false);
      setDebitAccountDisable(true);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.INVESTMENT) {
      setCreditAccountDisable(true);
      setDebitAccountDisable(true);
      setCategoryDisable(false);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.INVESTMENT) {
      setCreditAccountDisable(true);
      setDebitAccountDisable(false);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.REFUND) {
      setCreditAccountDisable(false);
      setDebitAccountDisable(true);
      setCategoryDisable(false);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.TRANSFER_OWN) {
      setCreditAccountDisable(false);
      setDebitAccountDisable(false);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    } else if (type === TransactionTypeEnums.TRANSFER_OTHERS) {
      setCreditAccountDisable(true);
      setDebitAccountDisable(true);
      setCategoryDisable(true);
      setDescriptionDisable(false);
    }
  };

  const handleSubTransactionTypeChange = async () => {
    let type: string;

    if (!props.defaultValues) {
      if (
        localTransactionType !== TransactionTypeEnums.ATM_WITHDRAWAL &&
        localTransactionType !== TransactionTypeEnums.CASH_RECIEVED
      ) {
        await clearAccountFields();
      }
      type = subTransactionTypeRef.current.value;
    } else {
      type = props.defaultValues.subTransactionType;
    }

    if (localTransactionType === TransactionTypeEnums.DEBT) {
      if (type === SubTransactionTypeEnums.TAKE) {
        if (!props.defaultValues) {
          descriptionRef.current.updateValue('Debt took from');
        }

        setDebitAccountDisable(true);
        setCreditAccountDisable(false);
      } else {
        if (!props.defaultValues) {
          descriptionRef.current.updateValue('Debt gave to');
        }

        setDebitAccountDisable(false);
        setCreditAccountDisable(true);
      }
    } else if (localTransactionType === TransactionTypeEnums.LEND) {
      if (type === SubTransactionTypeEnums.TAKE) {
        if (!props.defaultValues) {
          descriptionRef.current.updateValue('Lend money got back from');
        }

        setDebitAccountDisable(true);
        setCreditAccountDisable(false);
      } else {
        descriptionRef.current.updateValue('Lend money to');
        setDebitAccountDisable(false);
        setCreditAccountDisable(true);
      }
    } else if (localTransactionType === TransactionTypeEnums.TRANSFER_OWN) {
      setDebitAccountDisable(false);
      setCreditAccountDisable(false);

      if (!props.defaultValues) {
        if (type === SubTransactionTypeEnums.ACCOUNT_TRANSFER) {
          descriptionRef.current.updateValue('Own A/C Transfer');
        } else if (type === SubTransactionTypeEnums.CREDIT_CARD_PAYMENT) {
          descriptionRef.current.updateValue('CC Payment - ');
        } else if (type === SubTransactionTypeEnums.WALLET_PAYMENT) {
          descriptionRef.current.updateValue('Wallet Payment - ');
        }
      }
    } else if (localTransactionType === TransactionTypeEnums.TRANSFER_OTHERS) {
      if (type === SubTransactionTypeEnums.TRANSFER_IN) {
        setDebitAccountDisable(true);
        setCreditAccountDisable(false);
      } else if (type === SubTransactionTypeEnums.TRANSFER_OUT) {
        setDebitAccountDisable(false);
        setCreditAccountDisable(true);
      }
    } else if (localTransactionType === TransactionTypeEnums.INVESTMENT) {
      if (type === SubTransactionTypeEnums.DEPOSIT) {
        setDebitAccountDisable(false);
        setCreditAccountDisable(true);
      } else {
        setDebitAccountDisable(true);
        setCreditAccountDisable(false);
      }
    }
  };

  useEffect(() => {
    if (localTransactionType) {
      handleSubTransactionTypeChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTransactionType]);

  useEffect(() => {
    if (props.defaultValues && showModal) {
      handleTransactionTypeChange();
    } else {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultValues, showModal]);

  return (
    <>
      <Button label={props.defaultValues ? 'Edit' : 'Add'} onClick={handleShow} buttonClass={'primary'} />
      {showModal && (
        <div
          id="transaction-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-1 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  handleShow();
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <form className="space-y-6" action="#">
                  <div>
                    <div className="p-1">
                      <Datepicker
                        ref={transactionDateRef}
                        id="transactionDate"
                        label="Transaction Date"
                        defaultValue={transactionDate}
                        fieldState={transactionDateFieldState}
                      />
                    </div>
                    <div className="p-1">
                      <Dropdown
                        ref={transactionTypeRef}
                        id="transactionType"
                        label="Transaction Type"
                        items={transactionTypesItem}
                        onClick={handleTransactionTypeChange}
                        fieldState={transactionTypeFieldState}
                        defaultValue={transactionType}
                      />
                    </div>
                    <div className="p-1">
                      <Dropdown
                        ref={subTransactionTypeRef}
                        id="subTransactionType"
                        label="Sub Transaction Type"
                        items={subTransactionTypesItem}
                        onClick={handleSubTransactionTypeChange}
                        fieldState={subTransactionTypeFieldState}
                        defaultValue={subTransactionType}
                        disabled={subTransactionTypesItem.length > 0 ? false : true}
                      />
                    </div>
                    <div className="p-1">
                      <Dropdown
                        ref={debitAccountRef}
                        id="debitAccount"
                        label="Debit Account"
                        items={accountsItem}
                        disabled={debitAccountDisable}
                        fieldState={debitAccountFieldState}
                        defaultValue={debitAccount}
                      />
                    </div>
                    <div className="p-1">
                      <Dropdown
                        ref={creditAccountRef}
                        id="creditAccount"
                        label="Credit Account"
                        items={accountsItem}
                        disabled={creditAccountDisable}
                        fieldState={creditAccountFieldState}
                        defaultValue={creditAccount}
                      />
                    </div>
                    <div className="flex items-center p-1">
                      <Dropdown
                        ref={categoryRef}
                        id="category"
                        label="Category"
                        items={categoriesItem}
                        disabled={categoryDisable}
                        fieldState={categoryFieldState}
                        defaultValue={category}
                      />
                      <span className="ml-1">
                        <CategoryModal />
                      </span>
                    </div>
                    <div className="p-1">
                      <Input
                        ref={descriptionRef}
                        id="description"
                        label="Description"
                        size="normal"
                        inputType="text"
                        disabled={descriptionDisable}
                        suggestions={transactionDescriptions}
                        showSuggestions={true}
                        fieldState={descriptionFieldState}
                        defaultValue={description}
                      />
                    </div>
                    <div className="p-1">
                      <Input
                        ref={amountRef}
                        id="amount"
                        label="Amount"
                        size="normal"
                        inputType="number"
                        fieldState={amountFieldState}
                        defaultValue={amount}
                      />
                    </div>
                  </div>
                  <div className="m-2">
                    {errorMessage && <label className="text-red-500">{errorMessage}</label>}
                    {props.defaultValues ? (
                      <Button label="Update" onClick={updateOldTransaction} buttonClass="primary" />
                    ) : (
                      <Button label="Add" onClick={addNewTransaction} buttonClass="primary" />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionsModal;
