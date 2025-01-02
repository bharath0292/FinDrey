import axios from 'axios';
import { API_URL } from '../constants/api';
import { AccountAddType, AccountDeleteType, AccountType, AccountUpdateType } from '../types/Account';
import { ErrorResponseType } from '../types/Response';
export async function getAccounts(user_id: string): Promise<{ accounts: AccountType[] } | ErrorResponseType> {
  try {
    const { data, status } = await axios.get(API_URL + '/account?user_id=' + user_id);

    if (status === 200) {
      console.info('Accounts lists fetched');
      return { accounts: data };
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      return { error: error.message, statusCode: error.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function addAccount(new_account: AccountAddType): Promise<AccountType | ErrorResponseType> {
  const body = {
    user_id: new_account.user_id,
    bank_name: new_account.bank_name,
    account_number: new_account.account_number,
    account_type: new_account.account_type,
    balance: Number(new_account.balance)
  };

  try {
    const { data, status } = await axios.post(API_URL + '/account', body);

    if (status === 201) {
      console.info('Account added successfully');
      return data;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error);
      return { error: error.response.data, statusCode: error.response.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function updateAccount(update_account: AccountUpdateType): Promise<AccountType | ErrorResponseType> {
  const body = {
    id: update_account.id,
    user_id: update_account.user_id,
    bank_name: update_account.bank_name,
    account_number: update_account.account_number,
    account_type: update_account.account_type,
    balance: Number(update_account.balance)
  };

  try {
    const { data, status } = await axios.put(API_URL + '/account', body);

    if (status === 200) {
      console.info('Account updated successfully');
      return data;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error);
      return { error: error.response.data, statusCode: error.response.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function deleteAccount(deleteAccount: AccountDeleteType): Promise<boolean | ErrorResponseType> {
  const body = {
    id: deleteAccount.id,
    user_id: deleteAccount.user_id
  };
  try {
    const { status } = await axios.delete(API_URL + '/account', { data: body });

    if (status === 204) {
      console.info('Account deleted');
      return true;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      return { error: error.message, statusCode: error.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}

export async function getAccountType(): Promise<string[] | ErrorResponseType> {
  try {
    const { data, status } = await axios.get(API_URL + '/account-type');

    if (status === 200) {
      console.info('AccountTypes fetched');

      return data;
    } else {
      console.error('Unexpected error status code:', status);
      return { error: 'An unexpected error occurred', statusCode: status };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error message: ', error.message);
      return { error: error.message, statusCode: error.status };
    } else {
      console.error('unexpected error: ', error);
      return { error: 'An unexpected error occurred' };
    }
  }
}
