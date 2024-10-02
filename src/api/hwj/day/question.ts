import { ServerResponse } from '@/api/apiHandler';
import { api } from '@/api/hwj/index';
import { PostAnswerRequest } from '@/types/answerType';
import { createFormData } from '@/utils/answer';

export async function postAnswer({
  eventId,
  questionId,
  answer,
  mediaFile,
}: PostAnswerRequest): Promise<ServerResponse> {
  const formData = createFormData(answer, mediaFile);
  const response = await api.post(
    `/event/${eventId}/question/${questionId}`,
    formData,
  );
  return response.data;
}
