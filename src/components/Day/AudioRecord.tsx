import React from 'react';
import 'regenerator-runtime';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import ApproveIcon from '@/assets/icon/ApproveIcon.svg';
import CameraIcon from '@/assets/icon/CameraIcon.svg';
import DeleteIcon from '@/assets/icon/DeleteIcon.svg';
import Image from 'next/image';
import RecordIcon from '@/assets/icon/RecordIcon.svg';
import RecordingGIF from '@/assets/gif/pulse.gif';
import Waveform from './Waveform';

const onRecordingComplete = (blob: Blob) => {
  // 여기서 녹음된 오디오 블롭을 처리할 수 있습니다.
  // 예: 서버로 전송하거나 추가 처리를 수행
  console.log('녹음 완료:', blob);
};

interface AudioRecordProps {
  onCameraClick: () => void;
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  closeModal: () => void;
}

const AudioRecord = ({
  onCameraClick,
  selectedImage,
  setSelectedImage,
  closeModal,
}: AudioRecordProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [currentMode, setCurrentMode] = useState<string>('text');
  const [isDeleteImage, setIsDeleteImage] = useState(false);
  const [userInput, setUserInput] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
        onRecordingComplete(blob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && listening) {
      mediaRecorderRef.current.stop();
    }
  }, [listening]);

  const toggleListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser doesn't support speech recognition");
    }
    if (listening) {
      SpeechRecognition.stopListening();
      setUserInput(transcript);
      resetTranscript();
      stopRecording();
    } else {
      setUserInput('');
      resetTranscript();
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
      startRecording();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage('');
  };
  return (
    <>
      <div className="flex items-center flex-col bg-white px-3 py-4 w-[calc(100vw-40px)] rounded-[10px] shadow-lg">
        <div className="flex items-center w-full">
          <h2 className="text-[#BAD7EC] font-edensor text-2xl leading-[20px] tracking-[-1px] pr-2">
            A.
          </h2>
          <div className="flex w-full justify-between">
            {listening ? (
              <div className={'w-full text-[14px] text-wrap'}>{transcript}</div>
            ) : (
              <textarea
                className="w-full outline-none resize-none text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px] text-wrap"
                value={userInput}
                placeholder="답변 기록하기"
                onChange={(e) => setUserInput(e.target.value)}
              />
            )}
            <div className="flex gap-2">
              <RecordIcon onClick={() => setCurrentMode('record')} />
              <CameraIcon onClick={onCameraClick} />
            </div>
          </div>
        </div>
        {listening && <Image src={RecordingGIF} alt="alt" />}
        {audioUrl && (
          <Waveform
            url={audioUrl}
            toggleListening={toggleListening}
            setAudioUrl={setAudioUrl}
            closeModal={closeModal}
          />
        )}
        {currentMode === 'record' && audioUrl == null && (
          <button
            className="w-[42px] h-[42px] rounded-full bg-gray-200 flex items-center justify-center"
            onClick={toggleListening}
          >
            <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center">
              <div
                className={
                  listening
                    ? 'bg-red-500 w-[22px] h-[22px] rounded-[4px]'
                    : 'bg-red-500 w-[36px] h-[36px] rounded-full'
                }
              />
            </div>
          </button>
        )}
        {selectedImage && (
          <>
            <div className={'relative'}>
              <img
                src={selectedImage}
                alt="selectedImage"
                style={{ width: '300px' }}
                onClick={() => setIsDeleteImage(true)}
              />
              {isDeleteImage && (
                <div
                  className={
                    'absolute top-0 w-[300px] h-full flex items-center justify-center bg-black bg-opacity-50'
                  }
                  onClick={() => setIsDeleteImage(false)}
                >
                  <DeleteIcon onClick={handleDelete} />
                </div>
              )}
            </div>
          </>
        )}
        {(userInput !== '' || selectedImage) && audioUrl == null && (
          <div className={'flex items-center justify-center w-full mt-3'}>
            <ApproveIcon onClick={closeModal} />
          </div>
        )}
      </div>
    </>
  );
};

export default AudioRecord;
