import { ServerResponse } from '@/api/apiHandler';
import { api } from '@/api/hwj/index';
import { PostAnswerRequest } from '@/types/answerType';
import { SelectRepresentativeRequest } from '@/types/question';
import { createFormData } from '@/utils/answer';

export async function postAnswer({
  eventId,
  questionId,
  answer,
  mediaFile,
}: PostAnswerRequest): Promise<ServerResponse> {
  const formData = createFormData(answer, mediaFile);
  const response = await api.post(
    `/answer/${eventId}/question/${questionId}`,
    formData,
  );
  return response.data;
}

export async function selectRepresentative(
  {eventId, questionId}
: SelectRepresentativeRequest): Promise<ServerResponse> {
  const response = await api.put(`/event/${eventId}/representative-question/${questionId}`);
  return response.data;
}