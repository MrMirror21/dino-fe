import { ServerResponse } from '@/api/apiHandler';
import { api } from '@/api/hwj/index';
import {
  EventPostRequest,
} from '@/types/event';
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
