import { QuestionContentType } from './question';

export interface CompleteEventType {
  eventId: number;
  title: string;
  emotion: string;
  category: string;
  memo?: string;
  eventStatus: string; // termination 고정
  startDate: string | Date;
  endDate: string | Date;
  fileUrl: string;
  totalQuestionCount: number;
  totalAnswerCount: number;
  representativeQuestion: QuestionContentType;
}

export interface MonthAllEventsType {
  groupByDate: string | Date;
  questionContent: QuestionContentType[];
}
