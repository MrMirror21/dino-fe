import { CompleteEventType, MonthAllEventsType } from '@/types/hiStory';
import { useEffect, useState } from 'react';
import {
  useGetCompletedEvents,
  useGetSavedQuestions,
} from '@/hooks/api/useHiStory';

import ChevronRightIcon from '@/assets/icon/ChevronRightIcon.svg';
import CompletedEventThumbnail from '@/components/hiStory/CompletedEventThumbnail';
import Header from '@/components/Day/Header';
import NavBar from '@/components/common/NavBar';
import NotExist from '@/components/hiStory/NotExist';
import { QuestionContentType } from '@/types/question';
import SavedQuestionThumbnail from '@/components/hiStory/SavedQuestionThumbnail';
import { useRouter } from 'next/router';

const HiStoryPage = () => {
  const router = useRouter();
  const [savedQuestionList, setSavedQuestionList] = useState<
    MonthAllEventsType[]
  >([]);
  const [completedEventList, setCompletedEventList] = useState<
    CompleteEventType[]
  >([]);
  const [questionThumbnailList, setQuestionThumbnailList] = useState<
    QuestionContentType[]
  >([]);

  const {
    data: savedQuestionsData,
    isLoading: isSavedQuestionsLoading,
    isError: isSavedQuestionsError,
    refetch: refetchSavedQuestions,
  } = useGetSavedQuestions();

  const {
    data: completedEventsData,
    isLoading: isCompletedEventsLoading,
    isError: isCompletedEventsError,
    refetch: refetchCompletedEvents,
  } = useGetCompletedEvents();

  const handleRoute = (type: string) => {
    router.push(`/hi-story/${type}`);
  };

  useEffect(() => {
    if (savedQuestionList && savedQuestionList.length > 0) {
      setQuestionThumbnailList(
        savedQuestionList.flatMap((event) => event.questionContent),
      );
    }
  }, [savedQuestionList]);

  useEffect(() => {
    if (savedQuestionsData?.isSuccess) {
      setSavedQuestionList(savedQuestionsData.data);
    }
  }, [savedQuestionsData]);

  useEffect(() => {
    if (completedEventsData) {
      setCompletedEventList(completedEventsData.data);
    }
  }, [completedEventsData]);

  // 로딩
  if (isSavedQuestionsLoading || isCompletedEventsLoading) {
    return <div>Loading...</div>;
  }

  // 예외처리
  if (isSavedQuestionsError || isCompletedEventsError) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div
      className="flex flex-col w-full h-screen"
      style={{
        background:
          'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%), #FFF',
        boxShadow: '0px 2px 32px 0px rgba(136, 136, 136, 0.12)',
      }}
    >
      <Header />

      <div className="flex-1 overflow-y-auto pb-[68px] mb-8">
        <div className="flex flex-col gap-8 mt-8">
          <div>
            <div className="flex items-center justify-center w-full">
              <div className="w-[calc(100%-40px)] flex justify-between mb-3">
                <span className="font-pretendard-500 text-[#8ABADD] text-[20px]">
                  Moments
                </span>

                <div onClick={() => handleRoute('saved-questions')}>
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
            {questionThumbnailList && questionThumbnailList.length > 0 ? (
              <SavedQuestionThumbnail
                questionList={questionThumbnailList.slice(0, 3)}
              />
            ) : (
              <NotExist title="저장한 질문이" />
            )}
          </div>

          <div>
            <div className="flex items-center justify-center w-full">
              <div className="w-[calc(100%-40px)] flex justify-between mb-3">
                <span className="font-pretendard-500 text-[#8ABADD] text-[20px]">
                  Growths
                </span>
                <div onClick={() => handleRoute('completed-events')}>
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
            {completedEventList && completedEventList.length > 0 ? (
              <CompletedEventThumbnail
                eventList={completedEventList.slice(0, 4)}
              />
            ) : (
              <NotExist title="완료된 이벤트가" />
            )}
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default HiStoryPage;
