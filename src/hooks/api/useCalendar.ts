import { ServerResponse, useRequest } from '@/api/apiHandler';

import { AxiosError } from 'axios';
import { MonthEventType } from '@/types/calendar';
import { UseQueryResult } from '@tanstack/react-query';

export const useGetCalendarMonthEvents = (
  month: string | null,
): UseQueryResult<ServerResponse<MonthEventType[]>, AxiosError> => {
  return useRequest<MonthEventType[]>(`event/calendar?date=${month}`, {
    method: 'GET',
    queryOptions: {
      queryKey: ['monthEvent'],
      retry: false,
    },
  });
};
