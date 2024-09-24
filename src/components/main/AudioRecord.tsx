import { useCallback, useEffect, useRef, useState } from 'react';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import RecordIcon from '@/assets/icon/RecordIcon.svg';
import RecordingGIF from '@/assets/gif/pulse.gif';
import Image from 'next/image';
import Waveform from './Waveform';

const onRecordingComplete = (blob: Blob) => {
  // 여기서 녹음된 오디오 블롭을 처리할 수 있습니다.
  // 예: 서버로 전송하거나 추가 처리를 수행
  console.log('녹음 완료:', blob);
};

const AudioRecord = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [currentMode, setCurrentMode] = useState<string>('text');
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

  return (
    <>
      <div className="flex items-center flex-col bg-white px-3 py-4 w-[calc(100vw-40px)] rounded-[10px] shadow-lg">
        <div className="flex items-center w-full">
          <h2 className="text-[24px] font-bold text-[#EEEEEE] pr-2">A.</h2>
          <div className="flex w-full justify-between">
            {listening ? (
              <div className={'w-full text-[14px] text-wrap'}>{transcript}</div>
            ) : (
              <textarea
                className="w-full outline-none resize-none text-[14px] text-wrap"
                value={userInput}
                placeholder="답변 기록하기"
                onChange={(e) => setUserInput(e.target.value)}
              />
            )}
            <RecordIcon onClick={() => setCurrentMode('record')} />
          </div>
        </div>
        {listening && <Image src={RecordingGIF} alt="alt" />}
        {audioUrl && (
          <Waveform
            url={audioUrl}
            toggleListening={toggleListening}
            setAudioUrl={setAudioUrl}
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
      </div>
    </>
  );
};

export default AudioRecord;
