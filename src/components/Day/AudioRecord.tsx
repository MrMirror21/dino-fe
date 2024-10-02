import React from 'react';
import 'regenerator-runtime';

import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import ApproveIcon from '@/assets/icon/ApproveIcon.svg';
import CameraIcon from '@/assets/icon/CameraIcon';
import DeleteIcon from '@/assets/icon/DeleteIcon.svg';
import Image from 'next/image';
import RecordIcon from '@/assets/icon/RecordIcon';
import RecordingGIF from '@/assets/gif/pulse.gif';
import Waveform from './Waveform';
import { MyAnswer } from '@/types/answerType';

const onRecordingComplete = (blob: Blob) => {
  // 여기서 녹음된 오디오 블롭을 처리할 수 있습니다.
  // 예: 서버로 전송하거나 추가 처리를 수행
  console.log('녹음 완료:', blob);
};

interface AudioRecordProps {
  answer: MyAnswer;
  setAnswer: Dispatch<SetStateAction<MyAnswer>>;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  onCameraClick: Dispatch<SetStateAction<boolean>>;
  isCameraSelectOn: boolean;
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  onSubmit: () => void;
}

const AudioRecord = ({
  answer,
  setAnswer,
  setFile,
  onCameraClick,
  isCameraSelectOn,
  selectedImage,
  setSelectedImage,
  onSubmit,
}: AudioRecordProps) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [currentMode, setCurrentMode] = useState<string>('text');
  const [isDeleteImage, setIsDeleteImage] = useState(false);
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
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorderRef?.current?.mimeType,
        });
        const audioUrl = URL.createObjectURL(blob);
        setAudioUrl(audioUrl);
        setFile(new File([blob], 'audio.webm', { type: 'audio/webm' }));
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, []);

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
      const voiceToText = transcript;
      setAnswer({ ...answer, type: 'VOICE', content: voiceToText });
      resetTranscript();
      stopRecording();
    } else {
      setAnswer({ ...answer, type: 'VOICE', content: '' });
      resetTranscript();
      SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
      startRecording();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage('');
  };

  const handleCameraIconClick = () => {
    onCameraClick(!isCameraSelectOn);
    setCurrentMode('text');
  };

  const handleRecordIconClick = () => {
    onCameraClick(false);
    currentMode === 'text' ? setCurrentMode('record') : setCurrentMode('text');
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
              <div
                className={
                  'w-full text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px] text-wrap text-left'
                }
              >
                {transcript}
              </div>
            ) : (
              <textarea
                className="w-full outline-none resize-none text-[#000] font-pretendard text-sm font-extralight leading-[20px] tracking-[-1px] text-wrap"
                value={answer.content}
                placeholder="답변 기록하기"
                onChange={(e) =>
                  setAnswer((prev) => ({ ...prev, content: e.target.value }))
                }
              />
            )}
            {!selectedImage && !listening && !audioUrl && (
              <div className="flex gap-2">
                <RecordIcon
                  active={currentMode === 'record'}
                  onClick={handleRecordIconClick}
                />
                <CameraIcon
                  active={isCameraSelectOn}
                  onClick={handleCameraIconClick}
                />
              </div>
            )}
          </div>
        </div>
        {listening && <Image src={RecordingGIF} alt="alt" />}
        {audioUrl && (
          <Waveform
            url={audioUrl}
            toggleListening={toggleListening}
            setAudioUrl={setAudioUrl}
            onSubmit={onSubmit}
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
        {(answer.content !== '' || selectedImage) && audioUrl == null && (
          <div className={'flex items-center justify-center w-full mt-3'}>
            <ApproveIcon onClick={onSubmit} />
          </div>
        )}
      </div>
    </>
  );
};

export default AudioRecord;
