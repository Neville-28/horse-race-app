import { Track } from '../context/TrackContext';

// Racetrack names are official proper nouns — kept identical across locales,
// like a place name (matches how they appear on JRA/NAR race cards).
export const TRACKS: Track[] = [
  { id: 'kawasaki', name: '川崎競馬場' },
  { id: 'hanshin', name: '阪神競馬場' },
  { id: 'fuchu', name: '府中競馬場' },
  { id: 'nakayama', name: '中山競馬場' },
  { id: 'funabashi', name: '船橋競馬場' },
  { id: 'urawa', name: '浦和競馬場' },
  { id: 'ibaraki', name: '茨城県営競馬場' },
  { id: 'nagoya', name: '名古屋競馬場' },
];
