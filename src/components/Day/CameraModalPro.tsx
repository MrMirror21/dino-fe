import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Camera } from 'react-camera-pro';

interface CameraRef {
  takePhoto: () => string;
}

interface CameraModalProps {
  selectImage: Dispatch<SetStateAction<string | null>>;
  closeCameraSelect: () => void;
  onClose: () => void;
}

const CameraModalPro = ({
  selectImage,
  closeCameraSelect,
  onClose,
}: CameraModalProps) => {
  const camera = useRef<CameraRef | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleTakePhoto = () => {
    if (camera.current) {
      setIsFlashing(true);
      const photo = camera.current.takePhoto();
      setImage(photo);
    }
  };

  const handleUsePhoto = () => {
    image !== undefined && selectImage(image);
    closeCameraSelect();
    setImage(undefined);
    setIsPreview(false);
    onClose();
  };

  useEffect(() => {
    if (isFlashing) {
      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 100); // 100ms 후에 깜빡임 효과 제거
      return () => clearTimeout(timer);
    }
  }, [isFlashing]);

  return (
    <div className={'fixed left-0 top-0 w-screen h-screen bg-black'}>
      {isPreview ? (
        <div>
          <img
            src={image}
            alt="Preview photo"
            className={'absolute z-20 w-full h-full'}
          />
          <div
            className={
              'fixed flex bottom-0 left-0 w-full min-w-[130px] min-h-[130px] h-1/5 text-white bg-black bg-opacity-100 z-20 items-center justify-between p-[50px] box-border flex-row aspect-[1/1]:flex-row aspect-[1/1]:bottom-0 aspect-[1/1]:w-full aspect-[1/1]:h-1/5 max-w-[400px]:p-[10px]'
            }
          >
            <div onClick={() => setIsPreview(false)}>Retake</div>
            <div onClick={handleUsePhoto}>Use Photo</div>
          </div>
        </div>
      ) : (
        <>
          <Camera
            ref={camera}
            errorMessages={{
              noCameraAccessible:
                'No camera device accessible. Please connect your camera or try a different browser.',
              permissionDenied:
                'Permission denied. Please refresh and give camera permission.',
              switchCamera:
                'It is not possible to switch camera to different one because there is only one video device accessible.',
              canvas: 'Canvas is not supported.',
            }}
          />
          {isFlashing && (
            <div className="absolute inset-0 bg-black opacity-50 z-30 transition-opacity duration-100" />
          )}
          <div
            className={
              'fixed flex bottom-0 left-0 w-full min-w-[130px] min-h-[130px] h-1/5 bg-black bg-opacity-80 z-20 items-center justify-center p-[50px] box-border flex-row-reverse aspect-[1/1]:flex-row aspect-[1/1]:bottom-0 aspect-[1/1]:w-full aspect-[1/1]:h-1/5 max-w-[400px]:p-[10px]'
            }
          >
            <button
              className={
                'flex items-center justify-center bg-white w-[50px] h-[50px] rounded-[100%] shadow-lg mb-4'
              }
              onClick={handleTakePhoto}
            >
              <div className="w-[40px] h-[40px] rounded-full bg-white border border-[#b8b8b8]" />
            </button>
          </div>
          {image && (
            <img
              src={image}
              className={'absolute left-10 bottom-10 z-30 w-[6vh]'}
              alt="Taken photo"
              onClick={() => setIsPreview(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CameraModalPro;
