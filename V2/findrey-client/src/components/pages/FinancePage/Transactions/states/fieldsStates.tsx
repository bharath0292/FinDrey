import type { FieldState } from '@findrey/components/ui/Input';
import type { TransactionType } from '@findrey/types';

interface FieldStateType<T> {
	disabled: boolean;
	fieldType: FieldState;
	value?: T;
}

export type FieldStatesType = {
	id: FieldStateType<string | undefined>;
	transactionDate: FieldStateType<Date>;
	transactionType: FieldStateType<string>;
	subTransactionType: FieldStateType<string | undefined>;
	debitAccount: FieldStateType<string | undefined>;
	creditAccount: FieldStateType<string | undefined>;
	category: FieldStateType<string | undefined>;
	description: FieldStateType<string>;
	amount: FieldStateType<number | undefined>;
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
			type: 'UPDATE_ALL';
			payload: { value: TransactionType };
	  }
	| {
			type: 'RESET';
	  };

export const initialFieldStates: FieldStatesType = {
	id: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	transactionDate: {
		disabled: false,
		fieldType: 'info',
		value: new Date(),
	},
	transactionType: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	subTransactionType: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	debitAccount: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	creditAccount: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	category: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	description: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
	},
	amount: {
		disabled: false,
		fieldType: 'info',
		value: undefined,
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
		case 'UPDATE_ALL': {
			const updatedValue = {
				id: {
					...state.transactionDate,
					value: action.payload.value.id,
				},
				transactionDate: {
					...state.transactionDate,
					value: action.payload.value.transactionDate,
				},
				transactionType: {
					...state.transactionType,
					value: action.payload.value.transactionType,
				},
				subTransactionType: {
					...state.subTransactionType,
					value: action.payload.value.subTransactionType,
				},
				debitAccount: {
					...state.debitAccount,
					value: action.payload.value.debitAccount,
				},
				creditAccount: {
					...state.creditAccount,
					value: action.payload.value.creditAccount,
				},
				category: {
					...state.category,
					value: action.payload.value.category,
				},
				description: {
					...state.description,
					value: action.payload.value.description,
				},
				amount: {
					...state.amount,
					value: action.payload.value.amount,
				},
			};
			return {
				...state,
				...updatedValue,
			};
		}
		case 'RESET':
			return initialFieldStates;

		default:
			throw new Error(`Unhandled action type`);
	}
}
