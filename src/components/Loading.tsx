import React, { useEffect, useState } from 'react';

import Image from 'next/image';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="relative h-screen">
        <div
          className={`fixed inset-0 bg-white transition-opacity duration-1000 ease-in-out flex flex-col ${
            isVisible ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`transform transition-all duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 ${
              isVisible
                ? '-translate-y-1/2 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
          >
            <Image
              src="/gif/LoadingGIFDinoReal.gif"
              alt="loading"
              width={80}
              height={80}
              className="z-[9999]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
