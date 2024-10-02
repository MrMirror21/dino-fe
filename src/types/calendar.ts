import { AnswerType } from './answerType';
import { EmotionType } from './emotion';
import { EventStatus } from './event';

export interface MonthEventType {
  eventDate: Date | string;
  eventContent: EventContent[];
}

export interface EventContent {
  eventId: number;
  title: string;
  category: string;
  emotion: EmotionType;
  eventStatus: EventStatus;
  questionId: number;
  content: string;
  memo?: string;
  isAnswer: boolean;
  myAnswer: string;
  isPriority: boolean;
  fileUrl?: string;
  type: AnswerType;
}
