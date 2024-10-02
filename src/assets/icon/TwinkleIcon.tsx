import { EmotionType } from '@/types/emotion';
import { getEmotionColor } from '@/utils/emotionColor';

interface Props {
  emotion: EmotionType;
  isAnswer: boolean;
}

const TwinkleIcon: React.FC<Props> = ({ emotion, isAnswer }) => {
  const color = getEmotionColor(emotion);

  const pathData = isAnswer
    ? 'M0.949707 5.24268C3.7726 4.42184 4.92183 3.36037 5.89945 0.292929C6.55303 3.21493 7.63772 4.25955 10.8492 5.24268C8.07181 6.16818 7.0802 7.25564 5.89945 10.1924C4.87068 7.37239 3.83779 6.25477 0.949707 5.24268Z'
    : 'M3.67903 6.68852C3.11354 6.11502 2.43637 5.66939 1.58969 5.2789C2.41576 4.94196 3.0962 4.53065 3.66871 3.96638C4.22932 3.41385 4.66552 2.73526 5.04116 1.88509C5.33602 2.66841 5.72107 3.31037 6.26391 3.84961C6.86181 4.44353 7.62447 4.88572 8.59735 5.27021C7.8079 5.63193 7.16839 6.05576 6.62038 6.61261C6.02512 7.21748 5.55874 7.9585 5.11739 8.89446C4.71779 8.00542 4.26986 7.28772 3.67903 6.68852Z';

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 11 11"
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
