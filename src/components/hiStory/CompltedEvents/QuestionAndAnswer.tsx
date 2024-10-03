import 'react-h5-audio-player/lib/styles.css';

import React, { useEffect, useState } from 'react';
import {
  useDeleteQuestionBookmark,
  useSetQuestionBookmark,
} from '@/hooks/api/useBookmark';

import AudioPlayer from 'react-h5-audio-player';
import BookmarkIcon from '@/assets/icon/BookmarkIcon';
import ChevronRightIcon from '@/assets/icon/ChevronRightIcon.svg';
import { EmotionType } from '@/types/emotion';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { QuestionContentType } from '@/types/question';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import moment from 'moment';
import { useRouter } from 'next/router';

interface Props {
  question: QuestionContentType;
  title?: string; // /dream 페이지에서 사용
  isRepresent?: boolean;
  emotion?: EmotionType;
  isAvailBookmark?: boolean;
}

const QuestionAndAnswer = ({
  question,
  title,
  isRepresent = false,
  emotion,
  isAvailBookmark = false,
}: Props) => {
  const router = useRouter();
  const [showAnswer, setShowAnswer] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const {
    mutate: setBookmark,
    isPending: isSetBookmarkPending,
    isSuccess: isSetBookmarkSuccess,
    isError: isSetBookmarkError,
  } = useSetQuestionBookmark(question.questionId);

  const {
    mutate: deleteBookmark,
    isPending: isDeleteBookmarkPending,
    isSuccess: isDeleteBookmarkSuccess,
    isError: isDeleteBookmarkError,
  } = useDeleteQuestionBookmark(question.questionId);

  const toggleIsBookmark = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 중지

    if (isBookmark) {
      deleteBookmark(undefined, {
        onSuccess: (data) => {
          console.log('Success to delete bookmark', data);
          setIsBookmark(false);
        },
        onError: (error) => {
          console.error('Failed to delete bookmark', error);
          setIsBookmark(true);
        },
      });
    } // if(!isBookmark)
    else {
      setBookmark(undefined, {
        onSuccess: (data) => {
          console.log('Success to set bookmark', data);
          setIsBookmark(true);
        },
        onError: (error) => {
          console.error('Failed to set bookmark', error);
          setIsBookmark(false);
        },
      });
    }
  };

  useEffect(() => {
    setShowAnswer(!!title);
    setIsBookmark(question.isPriority);
  }, [question, title]);

  const backgroundStyle =
    isRepresent && emotion
      ? {
          background: `linear-gradient(92deg, ${getProgressAndButtonColor(
            emotion,
          )}00 0%, ${getProgressAndButtonColor(
            emotion,
          )}47 50%, ${getProgressAndButtonColor(emotion)}66 100%), #FFF`,
          boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)',
        }
      : {
          backgroundColor: '#FFF',
          boxShadow: '0px 2px 16px 0px rgba(68, 68, 68, 0.12)',
        };

  const renderAnswer = (type: string) => {
    switch (type) {
      case 'TEXT':
        return <p className="leading-[24px]">{question.myAnswer}</p>;
      case 'IMAGE':
        return (
          <div className="relative w-full h-72 mb-3.5">
            <Image
              // src={question.fileUrl}
              src="/image/LandingFlower.png"
              alt="answer"
              fill
              className="object-cover"
            />
          </div>
        );
      case 'VOICE':
        return (
          <div className="w-full mb-3.5" onClick={(e) => e.stopPropagation()}>
            {/* <audio
              src="https://chycdn.s3.ap-northeast-2.amazonaws.com/DayDream/3602426060/0/0/0/0bebb2a1-514b-4399-8b5f-10393f6d253e.mp3"
              // src={question.fileUrl}
              loop
              controls
              id="s3-audio-file"
            ></audio> */}
            <AudioPlayer
              // src="https://chycdn.s3.ap-northeast-2.amazonaws.com/DayDream/3602426060/0/0/0/0bebb2a1-514b-4399-8b5f-10393f6d253e.mp3"
              src={question.fileUrl}
              volume={0.5}
              loop
            />
          </div>
        );
      default:
        return <p className="leading-[24px]">{question.myAnswer}</p>;
    }
  };

  if (isSetBookmarkPending || isDeleteBookmarkPending) return <Loading />;
  return (
    <div className="w-[calc(100%-40px)] mx-auto">
      {title && (
        <div className="w-full flex justify-center">
          <div className="w-[calc(100%-24px)] h-[20px] mb-3">
            <span className="font-pretendard-400 text-[#888] text-[14px]">
              {title}
            </span>
          </div>
        </div>
      )}

      <div
        className={`w-full h-auto mb-2.5 py-4 self-center rounded-[10px] relative`}
        style={backgroundStyle}
        onClick={() => !title && setShowAnswer(!showAnswer)}
      >
        <div className="w-full flex flex-col items-start justify-center px-[10px]">
          <div className="w-full flex">
            <div className="flex-shrink-0 w-[28px]">
              <Image
                src="/image/Q.png"
                alt="question-image"
                width={22}
                height={24}
              />
            </div>
            <span className="font-pretendard-200 self-center text-[14px] flex-grow leading-[24px]">
              {question.content}
            </span>
          </div>

          {question.isAnswer && (showAnswer || !!title) && (
            <>
              <div
                className={`w-full flex ${isAvailBookmark ? 'mb-2' : 'mb-3.5'}`}
              >
                <div className="flex-shrink-0 w-[28px]">
                  <Image
                    src="/image/A.png"
                    alt="answer-image"
                    width={22}
                    height={24}
                  />
                </div>
                <div className="flex-grow self-center font-pretendard-200 text-[14px]">
                  {renderAnswer(question.type!)}
                </div>
              </div>
              {isAvailBookmark ? (
                <div
                  className="absolute bottom-[11px] right-4"
                  onClick={toggleIsBookmark}
                >
                  <BookmarkIcon isMarked={isBookmark} />
                </div>
              ) : (
                <div
                  className="absolute bottom-2 right-3.5"
                  onClick={toggleIsBookmark}
                >
                  <div className="text-[#6D6D6D] text-[10px] leading-5 font-pretendard-200 flex gap-1">
                    <span>
                      {moment(question.answeredAt.toString()).format(
                        'yyyy.M.D',
                      )}
                    </span>
                    <span>{question.eventTitle}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* /dream 페이지에서 답변하지 않은 경우 메인으로 라우팅 하는 UI 필요 */}
      {title && !question.isAnswer && (
        <div
          className={`w-full h-auto mb-2.5 py-[13px] self-center rounded-[10px]`}
          style={backgroundStyle}
          onClick={() => {
            router.push('/');
          }}
        >
          <div className="w-full flex flex-col items-start justify-center px-[10px]">
            <div className="w-full flex mt-1">
              <div className="flex-shrink-0 w-[28px]">
                <span className="font-edensor text-[#BAD7EC] text-[24px] leading-[24px]">
                  A.
                </span>
              </div>
              <div className="flex-grow font-pretendard-200 text-[14px] text-[#888] leading-5">
                <div className="flex justify-between">
                  <span>답변 작성하러 가기</span>
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAndAnswer;
