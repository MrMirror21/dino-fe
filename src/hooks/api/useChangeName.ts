import { ServerResponse, useRequest } from '@/api/apiHandler';

import { AxiosError } from 'axios';
import { UseMutationResult } from '@tanstack/react-query';

export const useSetUserName = (
  nickname: string | null,
): UseMutationResult<ServerResponse, AxiosError> => {
  return useRequest('/auth/nickname', {
    method: 'PUT',
    data: { nickname },
    mutationOptions: {
      mutationKey: ['updateNickname'],
    },
  });
};
