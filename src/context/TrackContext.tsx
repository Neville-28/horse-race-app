import React, { createContext, useContext, useMemo, useState } from 'react';

export type Track = { id: string; name: string };

type TrackContextValue = {
  track: Track | null;
  setTrack: (track: Track) => void;
};

const TrackContext = createContext<TrackContextValue | null>(null);

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null);

  const value = useMemo<TrackContextValue>(() => ({ track, setTrack }), [track]);

  return <TrackContext.Provider value={value}>{children}</TrackContext.Provider>;
}

export function useTrack() {
  const ctx = useContext(TrackContext);
  if (!ctx) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return ctx;
}
