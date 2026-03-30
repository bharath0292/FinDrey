import {
  AddAccountsArgsType,
  UpdateAccountsArgsType,
} from '@findrey/lib/accounts';

export const getValue = (
  name: keyof AddAccountsArgsType | keyof UpdateAccountsArgsType,
  value: string,
) => {
  if (name === 'balance') {
    if (value) {
      return parseFloat(value);
    } else {
      return 0.0;
    }
  } else {
    return value.toUpperCase();
  }
};
