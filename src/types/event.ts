export type AnswerType = 'TEXT' | 'VOICE' | 'IMAGE';
export type Step = 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
export interface EventPostRequest {
  title: string;
  startDate: string;
  endDate: string;
  memo?: string;
  occurrenceTime: string;
  emotion: string;
  questionSize: number;
}

export interface EventGetResponse {
  isSuccess: true;
  code: '200';
  message: string;
  createdAt: string; // "yyyy.MM.dd" 형식
  data: EventType;
}

export interface EventListGetResponse {
  isSuccess: true;
  code: '200';
  message: string;
  createdAt: string; // "yyyy.MM.dd" 형식
  data: Array<EventListType>;
}

export interface EventListType {
  eventId: number;
  title: String;
  memo?: String;
  category: String; //테마 (카테고리)
  eventStatus: String; //이벤트 상태(종료/진행)
  startDate: String;
  fileUrl: String;
  endDate: String;
  totalQuestionCount: number;
  totalAnswerCount: number;
  representativeQuestion: {
    questionId: number;
    questionDate: 'yyyy-MM-dd'; //질문 날짜
    isAnswer: Boolean; //답변 여부
    step: Step; //질문 단계
    content: String; //질문
    myAnswer: String; //내 답변
    answeredAt: 'yyyy-MM-dd';
    fileUrl: String; //답변 파일
    type: AnswerType;
  };
}

export interface EventType {
  eventId: number;
  title: string;
  emotion: string;
  eventStatus: 'termination' | 'execution';
  startDate: string; // "yyyy-MM-dd" 형식
  memo?: string;
  endDate: string; // "yyyy-MM-dd" 형식
  fileUrl: string;
  totalQuestionCount: number;
  totalAnswerCount: number;
  occurrenceTime: string; // "HH:mm" 형식
  representativeQuestion: {
    questionId: number;
    questionDate: string; // "yyyy-MM-dd" 형식
    isAnswer: boolean;
    isPriority: boolean;
    content: string;
    myAnswer: string;
    answeredAt: string; // "yyyy-MM-dd" 형식
    fileUrl: string;
    type: 'TEXT' | 'VOICE' | 'IMAGE';
  };
  questionContent: Array<QuestionType>;
}

export interface EventEditType {
  eventId: number;
  title: string;
  endDate: string;
  memo: string;
  occurrenceTime: string;
}

export interface QuestionType {
  questionId: number;
  questionDate: string; // "yyyy-MM-dd" 형식
  isAnswer: boolean;
  isPriority: boolean;
  eventTitle?: string;
  content: string;
  myAnswer: string;
  answeredAt: string; // "yyyy-MM-dd" 형식
  fileUrl: string;
  type: 'TEXT' | 'VOICE' | 'IMAGE';
}
export type EventStatus = 'termination' | 'execution';
