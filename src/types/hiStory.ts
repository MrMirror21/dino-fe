export interface CompleteEventType {
  eventId: number;
  title: string;
  emotion: string;
  category: string;
  eventStatus: string; // termination 고정
  startDate: string | Date;
  endDate: string | Date;
  fileUrl: string;
  totalQuestionCount: number;
  totalAnswerCount: number;
  representativeQuestion: {
    questionId: number;
    content: string;
    isAnswer: boolean;
    myAnswer: string;
    fileUrl?: string;
    type?: AnswerType;
  };
}

export type AnswerType = 'TEXT' | 'VOICE' | 'IMAGE';

export interface QuestionContentType {
  eventId: number;
  title: string;
  questionId: number;
  content: string;
  isAnswer: boolean;
  myAnswer: string;
  isPriority: boolean;
  fileUrl: string;
  type: AnswerType;
}

export interface MonthAllEventsType {
  eventDate: string | Date;
  questionContent: QuestionContentType[];
}
