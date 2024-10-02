import { EventContent, MonthEventType } from '@/types/calendar';
import React, { useCallback, useEffect, useState } from 'react';

import CustomCalendar from '@/components/dream/CustomCalendar';
import Header from '@/components/Day/Header';
import NavBar from '@/components/common/NavBar';
import QuestionAndAnswer from '@/components/hiStory/CompltedEvents/QuestionAndAnswer';
import { QuestionContentType } from '@/types/question';
import moment from 'moment';
import { useGetCalendarMonthEvents } from '@/hooks/api/useCalendar';

const DreamPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format('YYYY-MM'),
  );
  const [filteredEvents, setFilteredEvents] = useState<EventContent[]>([]);

  const {
    data: eventList,
    isLoading,
    isError,
    refetch,
  } = useGetCalendarMonthEvents(currentMonth);

  useEffect(() => {
    refetch();
  }, [currentMonth, refetch]);

  useEffect(() => {
    if (eventList?.data) {
      const filterEventsForDate = (date: string) => {
        return eventList.data
          .filter(
            (event) => moment(event.eventDate).format('YYYY-MM-DD') === date,
          )
          .flatMap((event) => event.eventContent);
      };

      const currentDateEvents = filterEventsForDate(selectedDate);
      setFilteredEvents(currentDateEvents);
    }
  }, [eventList, selectedDate]);

  const handleDateSelect = useCallback(
    (date: string) => {
      setSelectedDate(date);
      const newMonth = moment(date).format('YYYY-MM');
      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
      }
    },
    [currentMonth],
  );

  const handleMonthChange = useCallback(
    (date: Date) => {
      const newMonth = moment(date).format('YYYY-MM');
      if (newMonth !== currentMonth) {
        setCurrentMonth(newMonth);
      }
    },
    [currentMonth],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data. Please try again later.</div>;
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
        <CustomCalendar
          eventList={eventList?.data || []}
          setSelectedDate={handleDateSelect}
          onMonthChange={handleMonthChange}
        />
        <div className="mt-[80px] w-full gap-5 flex flex-col">
          {filteredEvents.map((event) => (
            <QuestionAndAnswer
              key={event.questionId}
              question={event as unknown as QuestionContentType}
              title={event.title}
              isAvailBookmark={true}
            />
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default DreamPage;
