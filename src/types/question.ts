import { AnswerType } from './answerType';

export interface QuestionContentType {
  questionId: number;
  eventTitle: string;
  content: string;
  isAnswer: boolean;
  myAnswer: string;
  answeredAt: string | Date; // 답변일 (yyyy-MM-dd)
  isPriority: boolean;
  questionDate: string | Date;
  fileUrl: string;
  type: AnswerType;
}
