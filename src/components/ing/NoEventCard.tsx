import Image from 'next/image';
import React from 'react';

const NoEventCard = () => {
  return (
    <div className="w-full h-[420px] flex flex-col items-center justify-center">
      <div>
        <Image
          alt="landing-flower"
          width={113}
          height={113}
          src="/image/notExistFlower.png"
        />
      </div>
      <div className="flex mt-5">
        <span className="text-black/60 font-pretendard-300 text-[20px] leading-tight tracking-tighter">
          기다리고 있는 이벤트가 없습니다.
        </span>
      </div>
    </div>
  );
};

export default NoEventCard;
