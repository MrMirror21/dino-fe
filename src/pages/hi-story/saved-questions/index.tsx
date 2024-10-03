import { useEffect, useState } from 'react';

import Header from '@/components/Day/Header';
import { MonthAllEventsType } from '@/types/hiStory';
import MonthlyEventGroup from '@/components/hiStory/CompltedEvents/MonthlyEventGroup';
import NavBar from '@/components/common/NavBar';
import { useGetSavedQuestions } from '@/hooks/api/useHiStory';

const SavedQuestionsPage = () => {
  const [allEventList, setAllEventList] = useState<MonthAllEventsType[]>([]);
  const { data, isLoading, isSuccess, isError } = useGetSavedQuestions();

  useEffect(() => {
    if (data?.isSuccess && data.data.length > 0) {
      setAllEventList(data.data);
    }
  }, [data]);

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
        {allEventList.map((event) => (
          <MonthlyEventGroup key={event.groupByDate.toString()} event={event} />
        ))}
      </div>

      <NavBar />
    </div>
  );
};

export default SavedQuestionsPage;
