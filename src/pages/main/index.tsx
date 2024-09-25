// main/index

import DateChanger from '@/components/DateChanger';
import EventElement from '@/components/eventManage/EventElement';
import EventList from '@/components/main/EventList';
import Header from '../../components/main/Header';
import NavBar from '@/components/common/NavBar';
import QuestionModal from '@/components/main/QuestionModal';
import SlideMenu from '@/components/main/SideMenu';
import { useState } from 'react';

interface Props {}

export default function MainPage<Props>({}) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const handleTimeChange = () => {
    return;
  };
  return (
    <>
      <div className={`flex flex-col text-center w-full h-screen items-center`}>
        <Header onClick={() => setIsSideMenuOpen(true)} />
        <SlideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        <EventElement />
        <DateChanger />
        <EventList setChosenEvent={setIsQuestionModalOpen} />
        <NavBar />
      </div>
      {isQuestionModalOpen && (
        <QuestionModal
          isOpen={isQuestionModalOpen}
          setIsOpen={setIsQuestionModalOpen}
        />
      )}
    </>
  );
}
