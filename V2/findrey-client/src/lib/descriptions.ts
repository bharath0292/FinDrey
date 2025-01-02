'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';
import type { SuccessResponseType } from '@findrey/types/response';

interface FetchDescriptionsArgsType {
  userId: string;
  descriptionSearch: string;
}

export const fetchDescriptions = async (
  args: FetchDescriptionsArgsType,
): Promise<SuccessResponseType<string[]>> => {
  const { userId, descriptionSearch } = args;

  if (!descriptionSearch) {
    return { data: [], count: 0 };
  }

  try {
    const { data } = await serverClient.get<SuccessResponseType<string[]>>(
      '/descriptions/query',
      {
        params: {
          search: descriptionSearch,
          userID: userId,
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
};
