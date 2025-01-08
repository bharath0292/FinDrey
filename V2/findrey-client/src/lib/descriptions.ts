'use server';

import axios from 'axios';

import serverClient from '@findrey/constants/serverClient';

interface FetchDescriptionsArgsType {
  userId: string;
  descriptionSearch: string | number;
}

export const fetchDescriptions = async (
  args: FetchDescriptionsArgsType,
): Promise<string[]> => {
  const { userId, descriptionSearch } = args;

  if (!descriptionSearch) {
    return [];
  }

  try {
    const { data } = await serverClient.get<string[]>('/descriptions/query', {
      params: {
        search: descriptionSearch,
        userID: userId,
      },
    });
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
