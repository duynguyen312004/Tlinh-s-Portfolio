'use client';

import { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

type AudioWindow = Window & {
  __hp_audio?: HTMLAudioElement;
};

const MUSIC_VOLUME = 0.75;

export default function AudioPlayer({ src, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audioWindow = window as AudioWindow;
    const audio = audioWindow.__hp_audio ?? new Audio(src);

    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audioRef.current = audio;
    audioWindow.__hp_audio = audio;

    if (autoPlay && audio.paused) {
      audio.play().catch(() => {});
    }
  }, [autoPlay, src]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  return (
    <button
      id="audio-toggle-btn"
      onClick={toggleMute}
      title={muted ? 'Turn music on' : 'Mute music'}
      aria-label={muted ? 'Turn music on' : 'Mute music'}
      className="fixed bottom-6 left-6 z-50 w-11 h-11 flex items-center justify-center rounded-full glass-card glow-border text-[11px] font-cinzel font-bold tracking-wider hover:scale-110 transition-transform duration-200"
      style={{ color: 'var(--house-accent)' }}
    >
      {muted ? 'OFF' : 'ON'}
    </button>
  );
}
