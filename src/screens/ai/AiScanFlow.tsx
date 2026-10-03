import React, { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { AnalysisResultScreen, ResultSource } from './AnalysisResultScreen';
import { CaptureModeScreen } from './CaptureModeScreen';
import { PhotoCaptureHubScreen } from './PhotoCaptureHubScreen';
import { PhotoScanScreen } from './PhotoScanScreen';
import { VideoCaptureScreen } from './VideoCaptureScreen';

export type PhotoAngle = 'front' | 'side';

type Step = 'select' | 'video' | 'photoHub' | 'photoCapture' | 'done';

const ANGLE_CONTENT = {
  front: {
    titleKey: 'frontTitle',
    headingKey: 'frontHeading',
    subtitleKey: 'frontSubtitle',
  },
  side: {
    titleKey: 'sideTitle',
    headingKey: 'sideHeading',
    subtitleKey: 'sideSubtitle',
  },
} as const;

export function AiScanFlow() {
  const { t } = useLocale();
  const [step, setStep] = useState<Step>('select');
  const [captured, setCaptured] = useState<Record<PhotoAngle, boolean>>({
    front: false,
    side: false,
  });
  const [activeAngle, setActiveAngle] = useState<PhotoAngle | null>(null);
  const [resultSource, setResultSource] = useState<ResultSource>({ type: 'video' });

  const resetFlow = () => {
    setCaptured({ front: false, side: false });
    setActiveAngle(null);
    setStep('select');
  };

  if (step === 'select') {
    return (
      <CaptureModeScreen
        onSelectVideo={() => setStep('video')}
        onSelectPhoto={() => setStep('photoHub')}
      />
    );
  }

  if (step === 'video') {
    return (
      <VideoCaptureScreen
        onBack={() => setStep('select')}
        onComplete={() => {
          setResultSource({ type: 'video' });
          setStep('done');
        }}
      />
    );
  }

  if (step === 'photoHub') {
    return (
      <PhotoCaptureHubScreen
        captured={captured}
        onBack={() => setStep('select')}
        onCapture={(angle) => {
          setActiveAngle(angle);
          setStep('photoCapture');
        }}
        onAnalyze={() => {
          const angles = (['front', 'side'] as PhotoAngle[]).filter((a) => captured[a]);
          setResultSource({ type: 'photo', angles });
          setStep('done');
        }}
      />
    );
  }

  if (step === 'photoCapture' && activeAngle) {
    const content = ANGLE_CONTENT[activeAngle];
    return (
      <PhotoScanScreen
        key={activeAngle}
        angle={activeAngle}
        title={t.aiScan[content.titleKey]}
        heading={t.aiScan[content.headingKey]}
        subtitle={t.aiScan[content.subtitleKey]}
        onBack={() => setStep('photoHub')}
        onConfirm={() => {
          setCaptured((prev) => ({ ...prev, [activeAngle]: true }));
          setStep('photoHub');
        }}
      />
    );
  }

  return <AnalysisResultScreen source={resultSource} onRetry={resetFlow} />;
}
