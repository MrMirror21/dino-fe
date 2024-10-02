import { ServerResponse, useRequest } from '@/api/apiHandler';

import { AxiosError } from 'axios';
import { UseMutationResult } from '@tanstack/react-query';

export const useSetQuestionBookmark = (
  questionId: number | null,
): UseMutationResult<ServerResponse, AxiosError> => {
  return useRequest(`question/${questionId}?priority=true`, {
    method: 'PUT',
    mutationOptions: {
      mutationKey: ['updateQuestionPriority'],
    },
  });
};

export const useDeleteQuestionBookmark = (
  questionId: number | null,
): UseMutationResult<ServerResponse, AxiosError> => {
  return useRequest(`question/${questionId}?priority=false`, {
    method: 'PUT',
    mutationOptions: {
      mutationKey: ['deleteQuestionPriority'],
    },
  });
};
