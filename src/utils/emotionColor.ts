import { EmotionType } from '@/types/emotion';

export const getEmotionColor = (emotion: EmotionType) => {
  switch (emotion) {
    case 'JOY':
      return '#E8D27A';
    case 'HAPPINESS':
      return '#98C4E3';
    case 'LOVE':
      return '#ED9797';
    case 'SATISFACTION':
      return '#F5AC80';
    case 'HOPE':
      return '#9BC984';
    case 'EXPECTATION':
      return '#BE92CB';
  }
};

export const getBackGroundStyle = (emotion: EmotionType) => {
  switch (emotion) {
    case 'JOY':
      return {
        background:
          'linear-gradient(168deg, rgba(245, 246, 216, 0.20) 0%, rgba(241, 223, 161, 0.20) 47.11%, rgba(240, 238, 154, 0.20) 100%)',
      };
    case 'HAPPINESS':
      return {
        background:
          'linear-gradient(168deg, rgba(142, 204, 217, 0.20) 0%, rgba(207, 227, 236, 0.20) 47.11%, rgba(86, 157, 195, 0.20) 100%)',
      };
    case 'LOVE':
      return {
        background:
          'linear-gradient(168deg, rgba(255, 226, 210, 0.20) 0%, rgba(244, 212, 212, 0.20) 47.11%, rgba(240, 120, 124, 0.20) 100%)',
      };
    case 'SATISFACTION':
      return {
        background:
          'linear-gradient(168deg, rgba(255, 247, 197, 0.20) 0%, rgba(232, 192, 180, 0.20) 47.11%, rgba(220, 172, 159, 0.20) 100%)',
      };
    case 'HOPE':
      return {
        background:
          'linear-gradient(168deg, rgba(210, 234, 174, 0.20) 0%, rgba(174, 200, 175, 0.20) 47.11%, rgba(75, 166, 134, 0.20) 100%)',
      };
    case 'EXPECTATION':
      return {
        background:
          'linear-gradient(168deg, rgba(240, 236, 240, 0.20) 0%, rgba(188, 197, 234, 0.20) 47.11%, rgba(186, 161, 216, 0.20) 100%)',
      };
  }
};

export const getProgressAndButtonColor = (emotion: EmotionType) => {
  switch (emotion) {
    case 'JOY':
      return '#F5E5A4';
    case 'HAPPINESS':
      return '#B4DFFD';
    case 'LOVE':
      return '#F9CDCD';
    case 'SATISFACTION':
      return '#FCC4A2';
    case 'HOPE':
      return '#B0EA9C';
    case 'EXPECTATION':
      return '#DCBFE5';
  }
};
