import React, { useEffect, useState } from 'react';
import {
  useDeleteQuestionBookmark,
  useSetQuestionBookmark,
} from '@/hooks/api/useBookmark';

import BookmarkIcon from '@/assets/icon/BookmarkIcon';
import ChevronRightIcon from '@/assets/icon/ChevronRightIcon.svg';
import { EmotionType } from '@/types/emotion';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { QuestionContentType } from '@/types/question';
import { QuestionType } from '@/types/event';
import { WaveformForPlay } from '@/components/Day/Waveform';
import { getProgressAndButtonColor } from '@/utils/emotionColor';
import moment from 'moment';
import { useRouter } from 'next/router';

interface Props {
  question: QuestionContentType | QuestionType;
  title?: string;
  isRepresent?: boolean;
  emotion?: EmotionType;
  isAvailBookmark?: boolean;
  isSelect?: boolean;
}

const QuestionAndAnswer = ({
  question,
  title,
  isRepresent = false,
  emotion,
  isAvailBookmark = false,
  isSelect = false,
}: Props) => {
  const router = useRouter();
  const [showAnswer, setShowAnswer] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const { mutate: setBookmark, isPending: isSetBookmarkPending } =
    useSetQuestionBookmark(question.questionId);
  const { mutate: deleteBookmark, isPending: isDeleteBookmarkPending } =
    useDeleteQuestionBookmark(question.questionId);

  const toggleIsBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmark) {
      deleteBookmark(undefined, {
        onSuccess: () => setIsBookmark(false),
        onError: () => setIsBookmark(true),
      });
    } else {
      setBookmark(undefined, {
        onSuccess: () => setIsBookmark(true),
        onError: () => setIsBookmark(false),
      });
    }
  };

  useEffect(() => {
    setShowAnswer(!!title || isSelect);
    setIsBookmark(question.isPriority);
  }, [question, title, isSelect]);

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
          ...(isSelect ? { border: '2px solid #BAD7EC' } : {}),
        };

  const renderAnswer = (type: string) => {
    switch (type) {
      case 'TEXT':
        return <p className="leading-[20px]">{question.myAnswer}</p>;
      case 'IMAGE':
        return (
          <div className="my-3">
            {question.myAnswer || ''}
            <div className="relative w-full h-80 mb-3.5 my-[10px]">
              <Image
                src={question.fileUrl}
                alt="answer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        );
      case 'VOICE':
        return (
          <div
            className="w-full mb-3.5 my-3"
            onClick={(e) => e.stopPropagation()}
          >
            {question.myAnswer || ''}
            <WaveformForPlay url={question.fileUrl} />
          </div>
        );
      default:
        return <p className="leading-[24px]">{question.myAnswer}</p>;
    }
  };

  if (isSetBookmarkPending || isDeleteBookmarkPending) return <Loading />;

  return (
    <div className="w-[calc(100%-40px)] mx-auto">
      {title && title !== 'isMainPage' && (
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
        onClick={() => !title && !isSelect && setShowAnswer(!showAnswer)}
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
            <span className="font-pretendard-200 self-center text-[14px] flex-grow leading-[20px]">
              {question.content}
            </span>
          </div>

          {question.isAnswer && (showAnswer || !!title || isSelect) && (
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
                <div className="absolute bottom-1.5 right-3.5">
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
