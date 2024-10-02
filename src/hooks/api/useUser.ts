import { changeName } from '@/api/hwj/day/auth';
import { ChangeNicknameRequest } from '@/types/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useChangeName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: ChangeNicknameRequest) => changeName(newName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['name'] }),
  });
}
