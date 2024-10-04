import {
  createEvent,
  deleteEvent,
  editEvent,
  getEvent,
  getEvents,
} from '@/api/hwj/day/event';
import { EventEditType, EventPostRequest } from '@/types/event';
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query';

export function useGetEvents() {
  return useQuery({ queryKey: ['events'], queryFn: getEvents });
}

export function useGetEvent(eventId: number) {
  return useQuery({ queryKey: ['event'], queryFn: () => getEvent(eventId) });
}

export function usePostEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEvent: EventPostRequest) => createEvent(newEvent),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['event'] }),
  });
}

export function useDeleteEvent() {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ['event'] }),
  });
}

export function useEditEvent() {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEvent: EventEditType) => editEvent(newEvent),
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ['event'] }),
  });
}
