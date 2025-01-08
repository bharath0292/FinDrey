'use client';

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { useDebouncedCallback } from 'use-debounce';

import {
  fieldStatesReducer,
  FieldStatesType,
  initialFieldStates,
} from '@findrey/components/pages/FinancePage/Transactions/states/fieldsStates';
import { FieldState, ItemType } from '@findrey/components/ui/Select';
import { SubTransactionType as SubTransactionTypeEnums } from '@findrey/enums/subTransactionType';
import { TransactionType as TransactionTypeEnums } from '@findrey/enums/transactionType';
import {
  useAccountsState,
  useAccountTypesState,
  useCategoriesState,
  useDescriptionsState,
  userState,
  useSubTransactionTypesState,
  useTransactionTypesState,
} from '@findrey/store';
import { getIdByValue, getValueById } from '@findrey/utils/utilities';

import { TransactionsPageContext } from './PageContext';
import { TransactionsPage } from './types';

type TransactionsPageProviderProps = {
  children: ReactNode;
};

export function TransactionsPageProvider({
  children,
}: Readonly<TransactionsPageProviderProps>) {
  const pathName = usePathname();
  const action = pathName?.split('/').pop();

  const { id: userId } = useRecoilValue(userState);

  const [descriptionSearch, setDescriptionSearch] = useState<string | number>(
    '',
  );
  const [fieldStates, dispatch] = useReducer(
    fieldStatesReducer,
    initialFieldStates,
  );

  const transactionTypesState = useTransactionTypesState();
  const subTransactionTypesState = useSubTransactionTypesState();
  const accountsState = useAccountsState(userId, 1, '');
  const accountTypesState = useAccountTypesState();
  const categoriesState = useCategoriesState(userId, 1, '');
  const descriptionsState = useDescriptionsState(userId, descriptionSearch);

  const transactionTypeItems = useMemo(
    () =>
      transactionTypesState.data?.data.reduce((options: ItemType[], item) => {
        options.push({ id: item.id, label: item.transactionType });
        return options;
      }, []) || [],
    [transactionTypesState.data],
  );

  const subTransactionTypeItems = useMemo(
    () => {
      if (
        !subTransactionTypesState.data ||
        !fieldStates.transactionType.value
      ) {
        return [];
      }

      return (
        subTransactionTypesState.data?.data.reduce(
          (options: ItemType[], item) => {
            if (!fieldStates.transactionType.value) {
              return [];
            }

            if (fieldStates.transactionType.value === item.transactionType) {
              options.push({ id: item.id, label: item.subTransactionType });
            }
            return options;
          },
          [],
        ) || []
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subTransactionTypesState.data, fieldStates.transactionType.value],
  );

  const creditAccountsItems = useMemo(
    () =>
      accountsState.data?.data.reduce((options: ItemType[], item) => {
        if (fieldStates.debitAccount.value !== item.id) {
          options.push({
            id: item.id,
            label: item.accountName,
            group: getValueById(item.accountType, accountTypesState.data?.data)
              ?.accountType,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accountsState.data, fieldStates.debitAccount.value],
  );

  const debitAccountsItems = useMemo(
    () =>
      accountsState.data?.data.reduce((options: ItemType[], item) => {
        if (fieldStates.creditAccount.value !== item.id) {
          options.push({
            id: item.id,
            label: item.accountName,
            group: getValueById(item.accountType, accountTypesState.data?.data)
              ?.accountType,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accountsState.data, fieldStates.creditAccount.value],
  );

  const categoryItems = useMemo(
    () =>
      categoriesState.data?.data.reduce((options: ItemType[], item) => {
        if (!fieldStates.transactionType.value) {
          return [];
        }
        if (fieldStates.transactionType.value === item.transactionType) {
          options.push({
            id: item.id,
            label: item.category,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoriesState.data, fieldStates.transactionType.value],
  );

  const descriptionItems = useMemo(
    () =>
      descriptionsState.data?.reduce((options: ItemType[], item) => {
        if (!options.find((option) => option.id === item)) {
          options.push({
            id: item,
            label: item,
          });
        }
        return options;
      }, []) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [descriptionsState.data],
  );

  const handleDescriptionSearch = useDebouncedCallback(
    (value: string | number) => {
      if (descriptionsState.data?.includes(value as string) || !value) {
        return;
      }
      setDescriptionSearch(value);
    },
    300,
  );

  const debouncedSearch = useCallback(
    (value: string | number) => handleDescriptionSearch(value),
    [handleDescriptionSearch],
  );

  const isLoading = [
    transactionTypesState.isLoading,
    subTransactionTypesState.isLoading,
    accountsState.isLoading,
    accountTypesState.isLoading,
    categoriesState.isLoading,
    // descriptionsState.isLoading ,
  ].some(Boolean);

  const isError = [
    transactionTypesState.isError,
    subTransactionTypesState.isError,
    accountsState.isError,
    accountTypesState.isError,
    categoriesState.isError,
  ].some(Boolean);

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

  const handleTransactionTypeChange = useCallback(
    (clearFields: boolean = true) => {
      if (!fieldStates.transactionType.value) {
        return;
      }

      const type = getValueById(
        fieldStates.transactionType.value,
        transactionTypeItems,
      );

      if (!type) {
        return;
      }

      if (clearFields) {
        clearAllFields();
      }

      const cashId =
        getIdByValue('CASH', 'accountName', accountsState.data?.data)?.id ??
        null;

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

      const updates = fieldUpdates[type.label];

      if (updates) {
        if (updates.description && clearFields) {
          updateFieldValue('description', updates.description);
        }

        updateFieldDisabled(updates.disabledFields, true);
      }

      if (
        type.label === TransactionTypeEnums.ATM_WITHDRAWAL ||
        type.label === TransactionTypeEnums.CASH_RECEIVED
      ) {
        updateFieldValue('creditAccount', cashId);
        updateFieldValue('debitAccount', null);
      } else {
        updateFieldValue('creditAccount', null);
        updateFieldValue('debitAccount', null);
      }
    },
    [
      fieldStates.transactionType.value,
      transactionTypeItems,
      accountsState.data,
    ],
  );

  const handleSubTransactionTypeChange = useCallback(
    (clearFields: boolean = true) => {
      if (!fieldStates.transactionType.value) return;
      if (!fieldStates.subTransactionType.value) return;

      const type = getValueById(
        fieldStates.subTransactionType.value,
        subTransactionTypesState.data?.data,
      );

      const transactionType = getValueById(
        fieldStates.transactionType.value,
        transactionTypesState.data?.data,
      );

      if (
        transactionType?.transactionType !==
          TransactionTypeEnums.ATM_WITHDRAWAL &&
        transactionType?.transactionType !==
          TransactionTypeEnums.CASH_RECEIVED &&
        clearFields
      ) {
        clearAccountFields();
      }

      const updateFields = (
        description: string,
        creditDisabled: boolean,
        debitDisabled: boolean,
      ) => {
        if (clearFields) {
          updateFieldValue('description', description);
        }
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
            updateFields('Debt took from ', false, true);
          } else {
            updateFields('Debt return to', true, false);
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

      if (transactionType?.id) {
        typeActions[transactionType.transactionType]?.();
      }
    },
    [
      fieldStates.subTransactionType.value,
      subTransactionTypesState.data?.data,
      transactionTypeItems,
    ],
  );

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

  useEffect(() => {
    if (!transactionTypesState.data || !fieldStates.transactionType.value) {
      return;
    }
    console.log('transactionType', fieldStates.transactionType.value);

    handleTransactionTypeChange(action === 'add');
  }, [fieldStates.transactionType.value, transactionTypesState.data?.data]);
  useEffect(() => {
    if (
      !subTransactionTypesState.data ||
      !fieldStates.subTransactionType.value ||
      !fieldStates.transactionType.value
    ) {
      return;
    }
    console.log('subTransactionType', fieldStates.subTransactionType.value);

    handleSubTransactionTypeChange(action === 'add');
  }, [
    fieldStates.subTransactionType.value,
    subTransactionTypesState.data?.data,
  ]);

  // Prepare context value with useMemo for performance optimization
  const contextValue: TransactionsPage = useMemo(
    () => ({
      userId,
      isLoading,
      isError,
      accounts: accountsState.data,
      transactionTypeItems,
      subTransactionTypeItems,
      creditAccountsItems,
      debitAccountsItems,
      categoryItems,
      descriptionItems,
      handleDescriptionSearch: debouncedSearch,
      descriptionsIsLoading: descriptionsState.isLoading,
      fieldStates,
      handleFieldState: dispatch,
      handleTransactionTypeChange,
      handleSubTransactionTypeChange,
      validateForm,
      updateFieldValue,
    }),
    [
      userId,
      isLoading,
      isError,
      transactionTypeItems,
      subTransactionTypeItems,
      creditAccountsItems,
      debitAccountsItems,
      categoryItems,
      descriptionItems,
      descriptionsState,
      accountsState,
      fieldStates,
    ],
  );

  return (
    <TransactionsPageContext.Provider value={contextValue}>
      {children}
    </TransactionsPageContext.Provider>
  );
}
