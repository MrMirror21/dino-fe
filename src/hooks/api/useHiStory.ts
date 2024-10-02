import { CompleteEventType, MonthAllEventsType } from '@/types/hiStory';
import { ServerResponse, useRequest } from '@/api/apiHandler';

import { AxiosError } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';

export const useGetSavedQuestions = (): UseQueryResult<
  ServerResponse<MonthAllEventsType[]>,
  AxiosError
> => {
  return useRequest<MonthAllEventsType[]>('/question/hi-story', {
    method: 'GET',
    queryOptions: {
      queryKey: ['savedQuestion'],
      retry: false,
    },
  });
};

export const useGetCompletedEvents = (): UseQueryResult<
  ServerResponse<CompleteEventType[]>,
  AxiosError
> => {
  return useRequest<CompleteEventType[]>('/event?event-status=TERMINATION', {
    method: 'GET',
    queryOptions: {
      queryKey: ['completedEvents'],
      retry: false,
    },
  });
};
