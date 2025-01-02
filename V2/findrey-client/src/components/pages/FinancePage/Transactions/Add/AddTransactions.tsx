'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
} from 'react';
import { usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import {
  fieldStatesReducer,
  FieldStatesType,
  initialFieldStates,
} from '@findrey/components/pages/FinancePage/Transactions/states/fieldsStates';
import Datepicker from '@findrey/components/ui/Datepicker';
import Input from '@findrey/components/ui/Input';
import type { FieldState, ItemType } from '@findrey/components/ui/Select';
import Select from '@findrey/components/ui/Select';
import { SubTransactionType as SubTransactionTypeEnums } from '@findrey/enums/subTransactionType';
import { TransactionType as TransactionTypeEnums } from '@findrey/enums/transactionType';
import {
  AddTransactionsArgsType,
  UpdateTransactionsArgsType,
} from '@findrey/lib/transactions';
import { getIdByValue, getValueById } from '@findrey/utils/utilities';

import { useTransactionActions } from '../hooks/useTransactionActions.hook';
import useTransactionsPageContext from '../hooks/useTransactions.hook';

import styles from './addTransactions.module.css';

function AddTransactions() {
  const pathName = usePathname();

  const {
    userId,
    transactions,
    transactionTypes,
    isLoading,
    isError,
    subTransactionTypes,
    accounts,
    accountTypes,
    descriptions,
    categories,
    handleChangeParams,
    descriptionsIsLoading,
  } = useTransactionsPageContext();

  const [fieldStates, dispatch] = useReducer(
    fieldStatesReducer,
    initialFieldStates,
  );

  const transactionAction = useTransactionActions(() => {
    dispatch({ type: 'RESET' });
  });

  const transactionTypeItems = useMemo(
    () =>
      transactionTypes?.data.reduce((options: ItemType[], item) => {
        options.push({ id: item.id, label: item.transactionType });
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [transactionTypes],
  );

  const subTransactionTypeItems = useMemo(
    () =>
      subTransactionTypes?.data.reduce((options: ItemType[], item) => {
        if (fieldStates.transactionType.value === item.transactionType) {
          options.push({ id: item.id, label: item.subTransactionType });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subTransactionTypes, fieldStates.transactionType.value],
  );

  const creditAccountsItems = useMemo(
    () =>
      accounts?.data.reduce((options: ItemType[], item) => {
        if (fieldStates.debitAccount.value !== item.id) {
          options.push({
            id: item.id,
            label: item.accountName,
            group: getValueById(item.accountType, accountTypes?.data)
              ?.accountType,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accounts, fieldStates.debitAccount.value],
  );

  const debitAccountsItems = useMemo(
    () =>
      accounts?.data.reduce((options: ItemType[], item) => {
        if (fieldStates.creditAccount.value !== item.id) {
          options.push({
            id: item.id,
            label: item.accountName,
            group: getValueById(item.accountType, accountTypes?.data)
              ?.accountType,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accounts, fieldStates.creditAccount.value],
  );

  const categoryItems = useMemo(
    () =>
      categories?.data.reduce((options: ItemType[], item) => {
        if (fieldStates.transactionType.value === item.transactionType) {
          options.push({
            id: item.id,
            label: item.category,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories, fieldStates.transactionType.value],
  );

  const descriptionItems = useMemo(
    () =>
      descriptions?.data.reduce((options: ItemType[], item) => {
        if (!options.find((option) => option.id === item)) {
          options.push({
            id: item,
            label: item,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [descriptions],
  );

  const updateFieldValue = (
    field: keyof FieldStatesType | Array<keyof FieldStatesType>,
    value: FieldStatesType[keyof FieldStatesType]['value'],
  ) => {
    if (Array.isArray(field)) {
      field.forEach((f) =>
        dispatch({
          type: 'SET_VALUE',
          payload: { field: f, value: value },
        }),
      );
    } else {
      dispatch({
        type: 'SET_VALUE',
        payload: { field, value: value },
      });
    }
  };
  const updateFieldType = (
    fields: Array<keyof FieldStatesType>,
    value: FieldState,
  ) => {
    fields.forEach((field) => {
      dispatch({
        type: 'UPDATE_FIELD_TYPE',
        payload: { field, value: value },
      });
    });
  };
  const updateFieldDisabled = (
    fields: Array<keyof FieldStatesType>,
    value: boolean,
  ) => {
    fields.forEach((field) => {
      dispatch({
        type: 'SET_DISABLED',
        payload: { field, value: value },
      });
    });
  };

  const handleDescriptionSearch = useDebouncedCallback((value: string) => {
    console.log(descriptions?.data.includes(value), value);

    if (descriptions?.data.includes(value) || !value) {
      return;
    }

    console.log('coming insde');

    handleChangeParams('descriptionSearch', value);
  }, 300);

  const clearAccountFields = () => {
    const fields: Array<keyof FieldStatesType> = [
      'debitAccount',
      'creditAccount',
    ];

    updateFieldValue(fields, null);
    updateFieldType(fields, 'info');
    updateFieldDisabled(fields, false);
  };

  const clearAllFields = () => {
    const fields: Array<keyof FieldStatesType> = [
      'subTransactionType',
      'category',
      'description',
    ];

    updateFieldValue(fields, null);
    updateFieldType(fields, 'info');
    updateFieldDisabled(fields, false);

    clearAccountFields();
  };

  const changeTransactionTypeFieldState = (transactionType: string) => {
    const cashId =
      getIdByValue('CASH', 'accountName', accounts?.data)?.id ?? null;

    // Define mappings for description and disabled fields
    const fieldUpdates: Record<
      string,
      { description?: string; disabledFields: Array<keyof FieldStatesType> }
    > = {
      [TransactionTypeEnums.ATM_WITHDRAWAL]: {
        description: 'ATM Withdrawal',
        disabledFields: ['subTransactionType', 'creditAccount', 'category'],
      },
      [TransactionTypeEnums.CASH_RECEIVED]: {
        description: 'Cash Received from',
        disabledFields: [
          'subTransactionType',
          'creditAccount',
          'debitAccount',
          'category',
        ],
      },
      [TransactionTypeEnums.CASHBACK]: {
        description: 'Cashback Received for',
        disabledFields: ['subTransactionType', 'debitAccount'],
      },
      [TransactionTypeEnums.DEBT]: {
        disabledFields: ['creditAccount', 'debitAccount', 'category'],
      },
      [TransactionTypeEnums.LEND]: {
        disabledFields: ['creditAccount', 'debitAccount', 'category'],
      },
      [TransactionTypeEnums.TRANSFER_OTHERS]: {
        disabledFields: ['creditAccount', 'debitAccount', 'category'],
      },
      [TransactionTypeEnums.EXPENSE]: {
        disabledFields: ['subTransactionType', 'creditAccount'],
      },
      [TransactionTypeEnums.INCOME]: {
        disabledFields: ['debitAccount', 'category'],
      },
      [TransactionTypeEnums.INVESTMENT]: {
        disabledFields: ['creditAccount', 'debitAccount'],
      },
      [TransactionTypeEnums.REFUND]: {
        disabledFields: ['debitAccount'],
      },
      [TransactionTypeEnums.TRANSFER_OWN]: {
        disabledFields: ['category'],
      },
    };

    const updates = fieldUpdates[transactionType];

    if (updates) {
      if (updates.description) {
        updateFieldValue('description', updates.description);
      }

      updateFieldDisabled(updates.disabledFields, true);
    }

    // Handle specific cases with additional logic
    if (
      transactionType === TransactionTypeEnums.ATM_WITHDRAWAL ||
      transactionType === TransactionTypeEnums.CASH_RECEIVED
    ) {
      updateFieldValue('creditAccount', cashId);
    }
  };

  const handleTransactionTypeChange = useCallback(
    (option: ItemType) => {
      const type = getValueById(option.id, transactionTypes?.data);

      if (!type) {
        return;
      }

      clearAllFields();
      changeTransactionTypeFieldState(type.transactionType);
    },
    [fieldStates, transactionTypes, accounts],
  );

  const handleSubTransactionTypeChange = useCallback(
    (id: ItemType) => {
      const type = getValueById(id.id, subTransactionTypes?.data);
      if (!fieldStates.transactionType.value) return;

      const transactionType = getValueById(
        fieldStates.transactionType.value,
        transactionTypes?.data,
      );

      if (
        transactionType?.transactionType !==
          TransactionTypeEnums.ATM_WITHDRAWAL &&
        transactionType?.transactionType !== TransactionTypeEnums.CASH_RECEIVED
      ) {
        clearAccountFields();
      }

      const updateFields = (
        description: string,
        creditDisabled: boolean,
        debitDisabled: boolean,
      ) => {
        updateFieldValue('description', description);
        updateFieldDisabled(['creditAccount'], creditDisabled);
        updateFieldDisabled(['debitAccount'], debitDisabled);
      };

      const typeActions: {
        [key: string]: () => void;
      } = {
        [TransactionTypeEnums.INCOME]: () => {
          updateFields('', false, true);
        },
        [TransactionTypeEnums.DEBT]: () => {
          if (type?.subTransactionType === SubTransactionTypeEnums.TAKE) {
            updateFields('Debt to ', false, true);
          } else {
            updateFields('Debt took from', true, false);
          }
        },
        [TransactionTypeEnums.LEND]: () => {
          if (type?.subTransactionType === SubTransactionTypeEnums.TAKE) {
            updateFields('Lend money got back from', false, true);
          } else {
            updateFields('Lend money to', true, false);
          }
        },
        [TransactionTypeEnums.TRANSFER_OWN]: () => {
          updateFieldDisabled(['creditAccount', 'debitAccount'], false);
          const descriptionMap: Record<string, string> = {
            [SubTransactionTypeEnums.ACCOUNT_TRANSFER]: 'Own A/C Transfer',
            [SubTransactionTypeEnums.CREDIT_CARD_PAYMENT]: 'CC Payment - ',
            [SubTransactionTypeEnums.WALLET_PAYMENT]: 'Wallet Payment - ',
          };
          if (type?.subTransactionType) {
            updateFieldValue(
              'description',
              descriptionMap[type.subTransactionType] || '',
            );
          }
        },
        [TransactionTypeEnums.TRANSFER_OTHERS]: () => {
          if (
            type?.subTransactionType === SubTransactionTypeEnums.TRANSFER_IN
          ) {
            updateFields('', false, true);
          } else if (
            type?.subTransactionType === SubTransactionTypeEnums.TRANSFER_OUT
          ) {
            updateFields('', true, false);
          }
        },
        [TransactionTypeEnums.INVESTMENT]: () => {
          if (type?.subTransactionType === SubTransactionTypeEnums.DEPOSIT) {
            updateFields('', true, false);
          } else {
            updateFields('', false, true);
          }
        },
      };

      if (transactionType?.transactionType) {
        typeActions[transactionType.transactionType]?.();
      }
    },
    [fieldStates, subTransactionTypes, transactionTypes],
  );

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

  const validateForm = () => {
    const fields: {
      name: keyof FieldStatesType;
      condition: boolean | undefined;
    }[] = [
      { name: 'transactionDate', condition: true },
      { name: 'transactionType', condition: true },
      {
        name: 'subTransactionType',
        condition: !fieldStates.subTransactionType.disabled,
      },
      { name: 'debitAccount', condition: !fieldStates.debitAccount.disabled },
      { name: 'creditAccount', condition: !fieldStates.creditAccount.disabled },
      { name: 'category', condition: !fieldStates.category.disabled },
      { name: 'description', condition: !fieldStates.description.disabled },
      { name: 'amount', condition: !fieldStates.amount.disabled },
    ];

    let validationSuccess = true;

    fields.forEach(({ name, condition }) => {
      if (condition && !fieldStates[name].value) {
        updateFieldType([name], 'error');
        validationSuccess = false;
      } else if (condition) {
        updateFieldType([name], 'info');
      }
    });

    return validationSuccess;
  };

  useLayoutEffect(() => {
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    const opp = pathName?.split('/').pop();

    if (opp === 'add') {
      return;
    }

    const selectedTransaction = transactions?.data.find(
      (transaction) => transaction.id === opp,
    );
    if (!selectedTransaction) {
      return;
    }
    updateFieldValue('id', selectedTransaction?.id);
    updateFieldValue('transactionDate', selectedTransaction?.transactionDate);
    updateFieldValue('transactionType', selectedTransaction?.transactionType);
    updateFieldValue(
      'subTransactionType',
      selectedTransaction?.subTransactionType,
    );
    updateFieldValue('debitAccount', selectedTransaction?.debitAccount);
    updateFieldValue('creditAccount', selectedTransaction?.creditAccount);
    updateFieldValue('category', selectedTransaction?.category);
    updateFieldValue('description', selectedTransaction?.description);
    updateFieldValue('amount', selectedTransaction?.amount);

    const transactionType = getValueById(
      selectedTransaction?.transactionType ?? '',
      transactionTypes?.data,
    )?.transactionType;
    transactionType && changeTransactionTypeFieldState(transactionType);
  }, [transactions]);

  if (isLoading || transactionAction.isLoading) {
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
            handleTransactionTypeChange(e);
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
            handleSubTransactionTypeChange(e);
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

export default AddTransactions;
