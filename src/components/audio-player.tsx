"use client";

import { useEffect, useRef } from "react";

interface AudioTrackerProps {
  url: string;
  onTimeUpdate: (time: number) => void;
  className?: string;
  startTimestamp?: number; // in milliseconds
  endTimestamp?: number;   // in milliseconds
  intervalMs?: number;     // custom interval for updates
}

export default function AudioTracker({
  url,
  onTimeUpdate,
  className,
  startTimestamp,
  endTimestamp,
  intervalMs = 100, // default: 100ms
}: AudioTrackerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    // Clear any old intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start custom update loop
    intervalRef.current = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        onTimeUpdate(audioRef.current.currentTime * 1000);
      }
    }, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalMs, onTimeUpdate]);

  useEffect(() => {
    if (startTimestamp == null || endTimestamp == null || !audioRef.current) return;

    audioRef.current.currentTime = startTimestamp / 1000;
    audioRef.current.play();

    const handlePauseOnEnd = () => {
      if (audioRef.current && audioRef.current.currentTime >= endTimestamp / 1000) {
        audioRef.current.pause();
      }
    };

    audioRef.current.addEventListener("timeupdate", handlePauseOnEnd);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handlePauseOnEnd);
    };
  }, [startTimestamp, endTimestamp]);

  return (
    <audio
      className={className}
      ref={audioRef}
      src={url}
      controls
    />
  );
}

