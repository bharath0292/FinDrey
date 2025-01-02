import type { FieldState } from '@findrey/components/ui/Input';
import { TransactionType } from '@findrey/types/transaction';

interface FieldStateType<T> {
  disabled: boolean;
  fieldType: FieldState;
  value?: T;
}

export type FieldStatesType = {
  id: FieldStateType<string | null>;
  transactionDate: FieldStateType<string | null>;
  transactionType: FieldStateType<string | null>;
  subTransactionType: FieldStateType<string | null>;
  debitAccount: FieldStateType<string | null>;
  creditAccount: FieldStateType<string | null>;
  category: FieldStateType<string | null>;
  description: FieldStateType<string | null>;
  amount: FieldStateType<number | null>;
};

export type FieldAction =
  | {
      type: 'UPDATE_FIELD_TYPE';
      payload: { field: keyof FieldStatesType; value: FieldState };
    }
  | {
      type: 'SET_DISABLED';
      payload: { field: keyof FieldStatesType; value: boolean };
    }
  | {
      type: 'SET_VALUE';
      payload: {
        field: keyof FieldStatesType;
        value: FieldStatesType[keyof FieldStatesType]['value'];
      };
    }
  | {
      type: 'RESET';
    };

export const initialFieldStates: FieldStatesType = {
  id: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  transactionDate: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  transactionType: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  subTransactionType: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  debitAccount: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  creditAccount: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  category: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  description: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
  amount: {
    disabled: false,
    fieldType: 'info',
    value: null,
  },
};

export function fieldStatesReducer(
  state: FieldStatesType,
  action: FieldAction,
) {
  switch (action.type) {
    case 'UPDATE_FIELD_TYPE':
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          fieldType: action.payload.value,
        },
      };

    case 'SET_DISABLED':
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          disabled: action.payload.value,
        },
      };
    case 'SET_VALUE':
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          value: action.payload.value,
        },
      };
    // case 'UPDATE_ALL':
    //   return {
    //     ...state,
    //     transactionDate: {
    //       ...state.transactionDate,
    //       value: action.payload.value.transactionDate,
    //     },
    //     transactionType: {
    //       ...state.transactionType,
    //       value: action.payload.value.transactionType,
    //     },
    //     subTransactionType: {
    //       ...state.subTransactionType,
    //       value: action.payload.value.subTransactionType,
    //     },
    //     debitAccount: {
    //       ...state.debitAccount,
    //       value: action.payload.value.debitAccount,
    //     },
    //     creditAccount: {
    //       ...state.creditAccount,
    //       value: action.payload.value.creditAccount,
    //     },
    //     category: {
    //       ...state.category,
    //       value: action.payload.value.category,
    //     },
    //     description: {
    //       ...state.description,
    //       value: action.payload.value.description,
    //     },
    //     amount: {
    //       ...state.amount,
    //       value: action.payload.value.amount,
    //     },
    //   };
    case 'RESET':
      return initialFieldStates;

    default:
      throw new Error(`Unhandled action type`);
  }
}
