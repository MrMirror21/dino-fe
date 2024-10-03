import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="relative">
        <Image
          src="/gif/LoadingGIFDinoReal.gif"
          alt="loading"
          width={70}
          height={70}
          priority
        />
      </div>
    </div>
  );
};

export default Loading;
