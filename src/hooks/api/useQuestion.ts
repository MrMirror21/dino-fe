import { postAnswer } from '@/api/hwj/day/question';
import { PostAnswerRequest } from '@/types/answerType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventId,
      questionId,
      answer,
      mediaFile,
    }: PostAnswerRequest) =>
      postAnswer({ eventId, questionId, answer, mediaFile }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['event'] }),
  });
}
