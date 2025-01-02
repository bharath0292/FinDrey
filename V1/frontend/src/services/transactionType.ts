import axios from 'axios';
import { API_URL } from '../constants/api';
import { ErrorResponseType } from '../types/Response';

export async function getTransactionType(): Promise<string[] | ErrorResponseType> {
  try {
    const { data, status } = await axios.get(API_URL + '/transaction-type');

    if (status === 200) {
      console.info('TransactionTypes fetched');

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
