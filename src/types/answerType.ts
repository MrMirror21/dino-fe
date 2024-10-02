// 미디어 타입을 정의하는 타입
export type MediaType = 'TEXT' | 'VOICE' | 'IMAGE';

// myAnswer 필드의 구조를 정의하는 인터페이스
export interface MyAnswer {
  content: string;
  type: MediaType;
}

// FormData에 추가될 전체 데이터 구조를 정의하는 인터페이스
export interface MyFormData extends FormData {
  append(name: 'myAnswer', value: string | Blob, fileName?: string): void;
  append(name: 'mediaFile', value: File | Blob, fileName?: string): void;
}

export interface PostAnswerRequest {
  eventId: number;
  questionId: number;
  answer: MyAnswer;
  mediaFile: File | undefined;
}

// FormData를 위한 타입 정의
export type MyAnswerFormData = FormData;
