import { EmotionType } from '@/pages/dream';

export const getEmotionColor = (emotion: EmotionType) => {
  switch (emotion) {
    case 'JOY':
      return '#FFF861';
    case 'HAPPINESS':
      return '#A3D8FF';
    case 'LOVE':
      return '#FFCDCD';
    case 'SATISFACTION':
      return '#FFD18A';
    case 'HOPE':
      return '#C9FFB7';
    case 'EXPECTATION':
      return '#E1CDFF';
  }
};
