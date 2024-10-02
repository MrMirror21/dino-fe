import { ChangeNicknameRequest, ChangeNicknameResponse } from '@/types/auth';
import { api } from '..';
import { ServerResponse } from '@/api/apiHandler';

export async function changeName(
  newName: ChangeNicknameRequest,
): Promise<ServerResponse<ChangeNicknameResponse>> {
  const response = await api.put(`/auth/nickname`, newName);
  return response.data;
}
