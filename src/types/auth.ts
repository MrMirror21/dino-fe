export interface ChangeNicknameResponse {
  id: number;
  socialId: string;
  memberStatus: 'ACTIVE' | string; // 다른 상태가 있다면 유니온 타입으로 추가할 수 있습니다
  userRole: 'ROLE_USER' | string; // 다른 역할이 있다면 유니온 타입으로 추가할 수 있습니다
  nickname: string;
  oauth2Provider: 'KAKAO' | string; // 다른 제공자가 있다면 유니온 타입으로 추가할 수 있습니다
}

export interface ChangeNicknameRequest {
  nickname: string;
}
