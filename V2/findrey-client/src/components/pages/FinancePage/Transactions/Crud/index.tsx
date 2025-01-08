'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Datepicker from '@findrey/components/ui/Datepicker';
import Input from '@findrey/components/ui/Input';
import Select from '@findrey/components/ui/Select';
import {
  AddTransactionsArgsType,
  fetchTransactionById,
  UpdateTransactionsArgsType,
} from '@findrey/lib/transactions';

import { useTransactionActions } from '../hooks/useTransactionActions.hook';
import useTransactionsPageContext from '../hooks/useTransactions.hook';

import styles from './crudTransactions.module.css';

function CrudTransactions() {
  const pathName = usePathname();
  const action = pathName?.split('/').pop();

  const {
    userId,
    transactionTypeItems,
    isLoading,
    isError,
    subTransactionTypeItems,
    creditAccountsItems,
    debitAccountsItems,
    descriptionItems,
    categoryItems,
    handleDescriptionSearch,
    descriptionsIsLoading,
    handleFieldState: dispatch,
    fieldStates,
    validateForm,
    updateFieldValue,
  } = useTransactionsPageContext();

  const [isFetching, setIsFetching] = useState(true);

  const transactionAction = useTransactionActions(() => {
    if (!action || action === 'add') {
      dispatch({ type: 'RESET' });
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationSuccess = validateForm();

    if (!validationSuccess) {
      return;
    }
    let transactionValue: UpdateTransactionsArgsType | AddTransactionsArgsType;
    if (
      fieldStates.transactionDate.value &&
      fieldStates.transactionType.value &&
      fieldStates.description.value &&
      fieldStates.amount.value
    ) {
      transactionValue = {
        userId: userId,
        transactionDate: fieldStates.transactionDate.value,
        transactionType: fieldStates.transactionType.value,
        subTransactionType: fieldStates.subTransactionType.value,
        debitAccount: fieldStates.debitAccount.value,
        creditAccount: fieldStates.creditAccount.value,
        category: fieldStates.category.value,
        description: fieldStates.description.value,
        amount: fieldStates.amount.value,
      } as AddTransactionsArgsType;

      if (fieldStates.id.value) {
        transactionValue = { id: fieldStates.id.value, ...transactionValue };
      }
      await transactionAction.mutateAsync(transactionValue);
    }
  };

  useEffect(() => {
    const fetchTransaction = async (transactionId: string) => {
      const transaction = await fetchTransactionById({ userId, transactionId });
      dispatch({
        type: 'UPDATE_ALL',
        payload: { value: transaction.data },
      });

      return transaction;
    };

    if (!action || action === 'add') {
      dispatch({ type: 'RESET' });
      setIsFetching(false);
      return;
    }

    fetchTransaction(action);
    setIsFetching(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isFetching || transactionAction.isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Error!!</div>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Datepicker
          id="transactionDate"
          defaultValue={fieldStates.transactionDate.value}
          label="Transaction Date"
          fieldState={fieldStates.transactionDate.fieldType}
          disabled={fieldStates.transactionDate.disabled}
          onChange={(value) => updateFieldValue('transactionDate', value)}
        />
        <Select
          id="transactionType"
          defaultValue={fieldStates.transactionType.value}
          items={transactionTypeItems}
          label="Transaction Type"
          fieldState={fieldStates.transactionType.fieldType}
          disabled={fieldStates.transactionType.disabled}
          onClick={(e) => {
            updateFieldValue('transactionType', e.id);
          }}
        />
        <Select
          id="subTransactionType"
          label="Sub Transaction Type"
          items={subTransactionTypeItems}
          defaultValue={fieldStates.subTransactionType.value}
          fieldState={fieldStates.subTransactionType.fieldType}
          disabled={fieldStates.subTransactionType.disabled}
          onClick={(e) => {
            updateFieldValue('subTransactionType', e.id);
          }}
        />
        <Select
          id="debitAccount"
          label="Debit Account"
          items={debitAccountsItems}
          defaultValue={fieldStates.debitAccount.value}
          fieldState={fieldStates.debitAccount.fieldType}
          disabled={fieldStates.debitAccount.disabled}
          onClick={(e) => updateFieldValue('debitAccount', e.id)}
        />
        <Select
          id="creditAccount"
          defaultValue={fieldStates.creditAccount.value}
          items={creditAccountsItems}
          label="Credit Account"
          fieldState={fieldStates.creditAccount.fieldType}
          disabled={fieldStates.creditAccount.disabled}
          onClick={(e) => updateFieldValue('creditAccount', e.id)}
        />
        <Select
          id="category"
          defaultValue={fieldStates.category.value}
          items={categoryItems}
          label="Category"
          fieldState={fieldStates.category.fieldType}
          disabled={fieldStates.category.disabled}
          onClick={(e) => updateFieldValue('category', e.id)}
        />
        <Input
          id="description"
          type="string"
          label="Description"
          defaultValue={fieldStates.description.value}
          size="normal"
          showSuggestions
          suggestions={descriptionItems}
          onChange={(e) => {
            handleDescriptionSearch(e);
            updateFieldValue('description', e);
          }}
          fieldState={fieldStates.description.fieldType}
          disabled={fieldStates.description.disabled}
          isLoading={descriptionsIsLoading}
        />
        <Input
          id="amount"
          type="number"
          label="Amount"
          defaultValue={fieldStates.amount.value}
          size="normal"
          fieldState={fieldStates.amount.fieldType}
          disabled={fieldStates.amount.disabled}
          onChange={(e) => updateFieldValue('amount', e)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CrudTransactions;
