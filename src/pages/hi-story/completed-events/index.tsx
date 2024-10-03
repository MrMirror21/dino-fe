import { useEffect, useState } from 'react';

import { CompleteEventType } from '@/types/hiStory';
import CompletedEventThumbnail from '@/components/hiStory/CompletedEventThumbnail';
import Header from '@/components/Day/Header';
import Loading from '@/components/Loading';
import NavBar from '@/components/common/NavBar';
import NotExist from '@/components/hiStory/NotExist';
import { mockCompletedEventList } from '@/utils/dummy';
import { tokenUtils } from '@/utils/tokenUtils';
import { useGetCompletedEvents } from '@/hooks/api/useHiStory';
import { useRouter } from 'next/router';

const CompletedEventsPage = () => {
  const router = useRouter();
  const [completedEventList, setCompletedEventList] = useState<
    CompleteEventType[]
  >([]);
  const { data, isLoading, isSuccess, isError } = useGetCompletedEvents();
  const isExam = tokenUtils.getUserName() === '송민석';

  const handleEventClick = (eventId: number) => {
    router.push(`/hi-story/completed-events/${eventId}`);
  };

  useEffect(() => {
    if (isExam) {
      setCompletedEventList(mockCompletedEventList);
      return;
    }
    if (data?.isSuccess) {
      setCompletedEventList(data.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
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
      <div className="mt-9">
        {completedEventList && completedEventList.length > 0 ? (
          <CompletedEventThumbnail
            eventList={completedEventList}
            onEventClick={handleEventClick}
          />
        ) : (
          <NotExist title="완료된 이벤트가" isFlower={true} />
        )}
      </div>
      <NavBar />
    </div>
  );
};

export default CompletedEventsPage;
