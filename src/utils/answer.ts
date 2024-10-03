import { MyAnswer, MyFormData } from '@/types/answerType';

export function createFormData(
  myAnswer: MyAnswer,
  mediaFile?: File,
): MyFormData {
  const formData = new FormData() as MyFormData;

  // myAnswer 객체를 JSON 문자열로 변환하여 추가
  formData.append(
    'myAnswer',
    new Blob([JSON.stringify(myAnswer)], { type: 'application/json' }),
  );

  // mediaFile 추가 (있는 경우)
  if (mediaFile) {
    formData.append('mediaFile', mediaFile, mediaFile.name);
  }

  return formData;
}
