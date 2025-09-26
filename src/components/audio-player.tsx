import { useEffect, useRef } from "react";

interface AudioTrackerProps {
  url: string;
  onTimeUpdate: (time: number) => void;
  className?: string;
}

export default function AudioTracker({ url, onTimeUpdate, className }: AudioTrackerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const updateTime = () => {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime * 1000);
    //   rafRef.current = requestAnimationFrame(updateTime);
    }
  };

//   const handlePlay = () => {
//     rafRef.current = requestAnimationFrame(updateTime);
//   };

//   const handlePause = () => {
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//   };

//   const handleEnded = () => {
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     onTimeUpdate(0); // reset
//   };

//   useEffect(() => {
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

  return (
    <audio
      className={className}
      ref={audioRef}
      src={url}
    //   onPlay={handlePlay}
    //   onPause={handlePause}
    //   onEnded={handleEnded}
        onTimeUpdate={updateTime}
      controls
    />
  );
}
