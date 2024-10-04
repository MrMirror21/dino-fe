import Header from '@/components/Day/Header';
import { useGetEvent } from '@/hooks/api/useEvent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { formatDate } from '../../utils/event';
import { QuestionType } from '../../types/event';
import QuestionAndAnswer from '@/components/hiStory/CompltedEvents/QuestionAndAnswer';
import { QuestionContentType } from '@/types/question';

const DayDreamPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isSuccess, error } = useGetEvent(Number(id));
  const [representiveQuestion, setRepresentiveQuestion] = useState<
    QuestionType | undefined
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
      <div className="w-calc[100%-40px]">
        <Header />
        <div>
          <div>
            <div>{data?.data?.title}</div>
            <div>
              {formatDate(data?.data?.startDate)} - 
              {formatDate(data?.data?.endDate)}
            </div>
          </div>
          <Image
            src={data?.data?.fileUrl}
            alt="growth"
            width={95}
            height={95}
          />
        </div>
        {data?.data?.questionContent.map((question: QuestionContentType) => (
          <QuestionAndAnswer question={question} />
        ))}
        <div>선택 완료</div>
      </div>
    </div>
  );
};

export default DayDreamPage;
