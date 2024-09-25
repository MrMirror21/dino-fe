import { EventContent, MonthEventType } from '@/pages/dream';
import React, { useEffect, useState } from 'react';
import { holidays, months } from '@/utils/calendar';

import Calendar from 'react-calendar';
import TwinkleIcon from '@/assets/icon/TwinkleIcon';
import moment from 'moment';
import styles from '@/components/dream/CustomCalendar.module.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  eventList: MonthEventType[];
  setSelectedDate: (date: string) => void;
}

interface EventInfo {
  date: string;
  events: EventContent[];
}

const CustomCalendar = ({ eventList, setSelectedDate }: Props) => {
  const [value, setValue] = useState<Value>(new Date());
  const [events, setEvents] = useState<EventInfo[]>([]);

  useEffect(() => {
    const formattedEvents = eventList.map((event) => ({
      date: moment(event.eventDate).format('YYYY-MM-DD'),
      events: event.eventContent,
    }));
    setEvents(formattedEvents);
  }, [eventList]);

  const handleMonthChange = ({
    activeStartDate,
    view,
  }: {
    activeStartDate: Date | null;
    view: string;
  }) => {
    if (view === 'month' && activeStartDate) {
      console.log(
        `Month changed to: ${moment(activeStartDate).format('MMMM YYYY')}`,
      );
    }
  };

  const navigationLabel = ({ date }: { date: Date }) => {
    return (
      <span>
        {months[date.getMonth()]}, {date.getFullYear()}
      </span>
    );
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const dayEvents =
      events.find((e) => e.date === formattedDate)?.events || [];

    return (
      <div className={styles.tileContentWrapper}>
        {dayEvents.map((event, index) => (
          <div key={index} className={styles.twinkleIconWrapper}>
            <TwinkleIcon emotion={event.emotion} isAnswer={event.isAnswer} />
          </div>
        ))}
      </div>
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const day = date.getDay();
      const classNames = [];

      if (day === 0 || holidays[formattedDate]) classNames.push(styles.holiday);
      else if (day === 6) classNames.push(styles.saturday);

      return classNames.join(' ');
    }
    return null;
  };

  return (
    <div className="overflow-auto pt-4">
      <div className={styles.customCalendar}>
        <Calendar
          onChange={setValue}
          minDetail="month"
          onClickDay={(value) =>
            setSelectedDate(moment(value).format('YYYY-MM-DD'))
          }
          value={value}
          tileContent={tileContent}
          tileClassName={tileClassName}
          formatDay={(locale, date) => date.getDate().toString()}
          formatShortWeekday={(locale, date) =>
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
          }
          formatMonth={(locale, date) => (date.getMonth() + 1).toString()}
          className={styles.reactCalendar}
          showNeighboringMonth={false}
          locale="en-US"
          navigationLabel={navigationLabel}
          next2Label={null}
          prev2Label={null}
          onActiveStartDateChange={handleMonthChange}
        />
      </div>
    </div>
  );
};

export default React.memo(CustomCalendar);
