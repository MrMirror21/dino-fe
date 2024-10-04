export const cycleCalculator = (date: string, questionSize: number) => {
  const Days = calculateDiffDays(date) + 1;
  const daysPerQuestion = Days / questionSize;
  switch (daysPerQuestion) {
    case 1:
      return '하루 한 번 질문이';
    case 2:
      return '이틀에 한 번 질문이';
    case 3:
      return '3일에 한 번 질문이';
    case 7:
      return '일주일에 한 번 질문이';
    case 10:
      return '10일에 한 번 질문이';
    case 30:
      return '한 달에 한 번 질문이';
    default:
      return `${Days}일 동안 ${questionSize}개의 질문이`;
  }
};

export const calculateDiffDays = (date: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = date.split('-').map(Number);
  const inputDate = new Date(year, month - 1, day); // 월은 0-indexed

  const diffTime = inputDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateQuestionSize = (date: string, step: number) => {
  const diffDays = calculateDiffDays(date);
  const totalDays = diffDays + 1; // 시작일과 종료일을 포함

  let result: number;

  switch (step) {
    case 0: // 최소 질문 개수
      result = 2;
      break;
    case 1: // 약 25%
      result = Math.max(2, Math.min(Math.round(totalDays * 0.25), 30));
      break;
    case 2: // 약 50%
      result = Math.max(2, Math.min(Math.round(totalDays * 0.5), 30));
      break;
    case 3: // 약 75%
      result = Math.max(2, Math.min(Math.round(totalDays * 0.75), 30));
      break;
    case 4: // 최대 질문 개수 (매일 또는 30개 중 작은 값)
      result = Math.min(totalDays, 30);
      break;
    default:
      result = 2; // 기본값은 최소 질문 개수
  }

  return result;
};

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function stringToDate(dateString: string): Date {
  if (dateString) {
    const [year, month, day] = dateString?.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  return new Date();
}


export const isValidDateFormat = (dateString: string): boolean => {
  const dateRegex = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
  // 형식 검사
  if (!dateRegex.test(dateString)) {
    return false;
  }

  // 날짜 파싱
  const [year, month, day] = dateString.split('-').map(Number);
  const inputDate = new Date(year, month - 1, day); // 월은 0-indexed

  // 유효한 날짜인지 확인 (예: 2023/02/31 같은 날짜 방지)
  if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() !== month - 1 ||
    inputDate.getDate() !== day
  ) {
    return false;
  }

  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 부분을 제거

  // 입력된 날짜가 오늘 이후인지 확인
  return inputDate > today;
};

export function calculatePeriod(startDateString: string, endDateString: string): number {
  const startDate = stringToDate(startDateString);
  const endDate = stringToDate(endDateString);

  // 밀리초 단위로 차이를 계산한 후, 일 단위로 변환
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}