import React, { useState } from 'react';
import { useLocale } from '../../i18n/LocaleContext';
import { SeatConfirmScreen } from './SeatConfirmScreen';
import { SeatDirectionScreen } from './SeatDirectionScreen';
import { SeatRegisterScreen } from './SeatRegisterScreen';
import { VenueGuideScreen } from './VenueGuideScreen';

export type SeatInfo = {
  area: string;
  tier: string;
  row: string;
  number: string;
};

// Sample seat, standing in for a scanned/entered ticket (demo data — no real
// OCR/ticket backend wired up yet).
const DEMO_SEAT: SeatInfo = {
  area: 'フジビュースタンド 3F',
  tier: 'S',
  row: '12',
  number: '8',
};

type Step = 'guide' | 'register' | 'confirm' | 'direction';

export function SeatFlow({ onClose }: { onClose?: () => void }) {
  const { t } = useLocale();
  const [step, setStep] = useState<Step>('guide');
  const [seat] = useState<SeatInfo>(DEMO_SEAT);

  const venueLabel = t.seatGuide.venueLabel;

  if (step === 'guide') {
    return (
      <VenueGuideScreen
        venueLabel={venueLabel}
        onBack={onClose}
        onFindSeat={() => setStep('register')}
        onOpenMap={() => setStep('direction')}
      />
    );
  }

  if (step === 'register') {
    return (
      <SeatRegisterScreen
        seat={seat}
        onBack={() => setStep('guide')}
        onReview={() => setStep('confirm')}
      />
    );
  }

  if (step === 'confirm') {
    return (
      <SeatConfirmScreen
        seat={seat}
        onBack={() => setStep('register')}
        onGuide={() => setStep('direction')}
        onRedo={() => setStep('register')}
      />
    );
  }

  return (
    <SeatDirectionScreen
      seat={seat}
      venueLabel={venueLabel}
      onBack={() => setStep('guide')}
      onDone={onClose}
    />
  );
}
