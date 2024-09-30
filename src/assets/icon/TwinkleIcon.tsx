import { EmotionType } from '@/types/emotion';
import { getEmotionColor } from '@/utils/emotionColor';

interface Props {
  emotion: EmotionType;
  isAnswer: boolean;
}

const TwinkleIcon: React.FC<Props> = ({ emotion, isAnswer }) => {
  const color = getEmotionColor(emotion);

  const pathData = isAnswer
    ? 'M0 4.24268C2.41962 3.5391 3.40468 2.62927 4.24264 3.51667e-05C4.80285 2.50461 5.73259 3.39999 8.48528 4.24268C6.10466 5.03597 5.25471 5.96808 4.24264 8.48532C3.36084 6.06815 2.4755 5.11019 0 4.24268Z'
    : 'M3.07499 5.43182C2.6159 4.96622 2.07324 4.59866 1.40874 4.27757C2.0571 3.99776 2.60143 3.6569 3.06542 3.19958C3.51909 2.75244 3.87792 2.21175 4.18682 1.54838C4.43401 2.15633 4.75264 2.66543 5.18941 3.09929C5.67894 3.58557 6.29342 3.95348 7.06154 4.27125C6.44612 4.56885 5.93644 4.91761 5.49438 5.3668C5.00662 5.86243 4.61976 6.46187 4.25843 7.20443C3.92939 6.50049 3.55761 5.92127 3.07499 5.43182Z';

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
      >
        <path
          d={pathData}
          fill={isAnswer ? color : 'none'}
          stroke={isAnswer ? 'none' : color}
        />
      </svg>
    </div>
  );
};

export default TwinkleIcon;
