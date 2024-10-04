import { postAnswer, selectRepresentative } from '@/api/hwj/day/question';
import { PostAnswerRequest } from '@/types/answerType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SelectRepresentativeRequest } from '../../types/question';

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

export function useSelectRepresentative() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, questionId }: SelectRepresentativeRequest) =>
      selectRepresentative({ eventId: eventId, questionId: questionId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['question'] }),
  });
}
