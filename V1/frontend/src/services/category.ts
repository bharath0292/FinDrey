import axios from 'axios';
import { API_URL } from '../constants/api';
import { CategoryAddType, CategoryResponseType } from '../types/Category';
import { ErrorResponseType } from '../types/Response';

export async function getCategory(user_id: string): Promise<string[] | ErrorResponseType> {
  try {
    const { data, status } = await axios.get(API_URL + '/category/' + user_id);

    if (status === 200) {
      console.info('Categories fetched');

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

export async function addCategory(new_category: CategoryAddType): Promise<CategoryResponseType | ErrorResponseType> {
  const body = {
    user_id: new_category.user_id,
    catgeory: new_category.category
  };

  try {
    const { data, status } = await axios.post(API_URL + '/category', body);

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
