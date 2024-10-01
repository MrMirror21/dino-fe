export interface EventPostRequest {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  memo: string;
  occurrenceTime: string;
  emotion: string;
  questionSize: number;
}

export type EventStatus = 'termination' | 'execution';
