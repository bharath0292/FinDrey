import { Dispatch } from 'react';

import { ItemType } from '@findrey/components/ui/Select';
import { AccountType } from '@findrey/types';

import { FieldAction, FieldStatesType } from '../states/fieldsStates';

export type TransactionsPage = {
  userId: string;
  isLoading: boolean;
  isError: boolean;
  accounts?: SuccessResponseType<AccountType[]>;
  transactionTypeItems: ItemType[];
  subTransactionTypeItems: ItemType[];
  creditAccountsItems: ItemType[];
  debitAccountsItems: ItemType[];
  categoryItems: ItemType[];
  descriptionItems: ItemType[];
  fieldStates: FieldStatesType;
  handleDescriptionSearch: (value: string | number) => void;
  descriptionsIsLoading: boolean | undefined;
  handleFieldState: Dispatch<FieldAction>;
  handleTransactionTypeChange: (clearFields?: boolean) => void;
  handleSubTransactionTypeChange: (clearFields?: boolean) => void;
  validateForm: () => boolean;
  updateFieldValue: (
    field: keyof FieldStatesType | Array<keyof FieldStatesType>,
    value: FieldStatesType[keyof FieldStatesType]['value'],
  ) => void;
};
