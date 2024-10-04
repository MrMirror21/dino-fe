import Header from '@/components/Day/Header';
import { useGetEvent } from '@/hooks/api/useEvent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { formatDate, stringToDate } from '../../utils/event';
import { QuestionType } from '../../types/event';
import QuestionAndAnswer from '@/components/hiStory/CompltedEvents/QuestionAndAnswer';
import { QuestionContentType } from '@/types/question';

const DayDreamPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isSuccess, error } = useGetEvent(Number(id));
  const [representiveQuestion, setRepresentiveQuestion] = useState<
    Number | undefined
  >(undefined);
  console.log(id);
  console.log(data);
  return (
    <div
      className="flex flex-col w-full h-screen"
      style={{
        background:
          'linear-gradient(168deg, rgba(251, 243, 231, 0.20) 0%, rgba(185, 206, 215, 0.20) 47.11%, rgba(235, 219, 244, 0.20) 100%), #FFF',
        boxShadow: '0px 2px 32px 0px rgba(136, 136, 136, 0.12)',
      }}
    >
      <div className="w-full flex flex-col">
        <Header />
        <div className="w-full flex flex-row items-center justify-between px-5 mb-[6px]">
          <div>
            <div className="text-black/60 text-left font-pretendard-300 text-xl leading-[140%] tracking-[-0.8px]">
              {data?.data?.title}
            </div>
            <div className="text-[#969A9C] text-center font-pretendard-200 text-xs leading-[140%] tracking-[-0.3px]">
              {data?.data?.startDate.replace(/-/g, '.')} -
              {data?.data?.endDate.slice(5).replace(/-/g, '.')}
            </div>
          </div>
          <Image
            src={data?.data?.fileUrl}
            alt="growth"
            width={95}
            height={95}
          />
        </div>
        <div className="text-[#969A9C] px-5 mb-[6px] text-left font-pretendard-400 text-sm leading-[140%] tracking-[-1px]">
          대표질문 선택하기
        </div>
        {data?.data?.questionContent.map((question: QuestionContentType) => (
          <QuestionAndAnswer question={question} />
        ))}
        <div className="fixed px-5 bottom-5 w-full">
          <button className={`w-full py-[13px] rounded-[10px] ${!representiveQuestion ? 'bg-[#E9E9E9]' : 'bg-[#8ABADD]'}`}>선택 완료</button>
        </div>
      </div>
    </div>
  );
};

export default DayDreamPage;
