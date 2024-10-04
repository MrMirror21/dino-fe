import { ServerResponse } from '@/api/apiHandler';
import { api } from '@/api/hwj/index';
import { EventEditType, EventPostRequest } from '@/types/event';
// 이벤트
export async function getEvents(): Promise<ServerResponse> {
  const response = await api.get(`/event?event-status=EXECUTION`);
  return response.data;
}

export async function getEvent(eventId: Number): Promise<ServerResponse> {
  const response = await api.get(`/event/${eventId}`);
  return response.data;
}

export async function createEvent(
  newEvent: EventPostRequest,
): Promise<ServerResponse> {
  const response = await api.post(`/event`, newEvent);
  return response.data;
}

export async function deleteEvent(eventId: number): Promise<ServerResponse> {
  const response = await api.delete(`/event/${eventId}`);
  return response.data;
}

export async function editEvent(
  newEvent: EventEditType,
): Promise<ServerResponse> {
  const editRequest = {
    title: newEvent.title,
    endDate: newEvent.endDate,
    memo: newEvent.memo,
    occurrenceTime: newEvent.occurrenceTime,
  };
  const response = await api.put(`/event/${newEvent.eventId}`, editRequest);
  return response.data;
}
