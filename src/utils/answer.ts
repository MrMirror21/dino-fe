import { MyAnswer, MyFormData } from '@/types/answerType';

export function createFormData(
  myAnswer: MyAnswer,
  mediaFile?: File,
): MyFormData {
  const formData = new FormData() as MyFormData;

  // myAnswer JSON 추가
  const myAnswerBlob = new Blob([JSON.stringify({ myAnswer })], {
    type: 'application/json',
  });
  formData.append('myAnswer', myAnswerBlob, 'myAnswer.json');

  // mediaFile 추가 (있는 경우)
  if (mediaFile) {
    formData.append('mediaFile', mediaFile, mediaFile.name);
  }

  return formData;
}
