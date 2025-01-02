import { Dispatch } from 'react';

import { SubTransactionType as SubTransactionTypeEnums } from '@findrey/enums/subTransactionType';
import { TransactionType as TransactionTypeEnums } from '@findrey/enums/transactionType';
import { SubTransactionTypesType } from '@findrey/types/subTransactionType';
import { TransactionType } from '@findrey/types/transaction';

import { FieldAction, FieldStatesType } from './states/fieldsStates';

export const handleTransactionTypeChange = (
  type: TransactionType,
  dispatch: Dispatch<FieldAction>,
  fieldStates: FieldStatesType,
  //   updateState,
) => {
  if (!type) return;

  const clearFields = () => {
    Object.keys(fieldStates).forEach((field) => {
      fieldStates[field]?.ref?.current?.clearComponent();
      dispatch({ type: 'SET_DISABLED', payload: { field, disabled: false } });
    });
  };

  clearFields();

  switch (type.transactionType) {
    case TransactionTypeEnums.ATM_WITHDRAWAL:
      //   updateState({
      //     description: 'ATM Withdrawal',
      //     creditAccount: 'CASH',
      //   });
      dispatch({
        type: 'SET_DISABLED',
        payload: { field: 'creditAccount', disabled: true },
      });
      break;
    case TransactionTypeEnums.CASH_RECEIVED:
      //   updateState({
      //     description: 'Cash Received from',
      //     creditAccount: 'CASH',
      //   });
      dispatch({
        type: 'SET_DISABLED',
        payload: { field: 'debitAccount', disabled: true },
      });
      break;
    case TransactionTypeEnums.CASHBACK:
      //   updateState({ description: 'Cashback Received from' });
      dispatch({
        type: 'SET_DISABLED',
        payload: { field: 'debitAccount', disabled: true },
      });
      break;
    default:
      // Add additional cases as needed
      break;
  }
};

// Utility function for handling sub-transaction type changes
export const handleSubTransactionTypeChange = (
  subType: SubTransactionTypesType,
  transactionType: TransactionType,
  dispatch: Dispatch<FieldAction>,
  //   updateState,
) => {
  if (!subType || !transactionType) return;

  switch (transactionType.transactionType) {
    case TransactionTypeEnums.DEBT:
      if (subType.subTransactionType === SubTransactionTypeEnums.TAKE) {
        // updateState({ description: 'Debt to ' });
        dispatch({
          type: 'SET_DISABLED',
          payload: { field: 'debitAccount', disabled: true },
        });
      } else {
        // updateState({ description: 'Debt took from' });
      }
      break;
    // Add additional cases for other transaction/sub-transaction combinations
    default:
      break;
  }
};
