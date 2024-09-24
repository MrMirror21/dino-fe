import NavBar from '@/components/common/NavBar';
import DateChanger from '@/components/DateChanger';
import EventElement from '@/components/eventManage/EventElement';
import SlideMenu from '@/components/main/SideMenu';
import TimePicker from '@/components/TimePicker';
import { useState } from 'react';
import Header from '../../components/main/Header';
import EventList from '@/components/main/EventList';
import QuestionModal from '@/components/main/QuestionModal';
import Waveform from '@/components/main/Waveform';
import CameraModalPro from '@/components/main/CameraModalPro';

interface Props {}

export default function MainPage<Props>({}) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const handleTimeChange = () => {
    return;
  };
  return (
    <>
      <div
        className={`flex flex-col text-center w-full h-screen items-center justify-center relative`}
      >
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
      {isCameraOn && <CameraModalPro onClose={() => setIsCameraOn(false)}/>}
    </>
  );
}
