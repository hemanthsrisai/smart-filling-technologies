"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

export function CustomVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Auto-hide controls after 3s of inactivity
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isScrubbing) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  /* ── Touch/pointer-friendly scrubbing ── */
  const seekToPosition = useCallback(
    (clientX: number) => {
      const bar = progressBarRef.current;
      if (!bar || !videoRef.current || !duration) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      const time = (pct / 100) * duration;
      videoRef.current.currentTime = time;
      setProgress(pct);
      setCurrentTime(time);
    },
    [duration]
  );

  const handleScrubStart = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsScrubbing(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      seekToPosition(e.clientX);
    },
    [seekToPosition]
  );

  const handleScrubMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isScrubbing) return;
      e.preventDefault();
      e.stopPropagation();
      seekToPosition(e.clientX);
    },
    [isScrubbing, seekToPosition]
  );

  const handleScrubEnd = useCallback(
    (e: React.PointerEvent) => {
      if (!isScrubbing) return;
      e.preventDefault();
      e.stopPropagation();
      setIsScrubbing(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    },
    [isScrubbing]
  );

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = videoRef.current?.parentElement;
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="relative w-full h-full max-h-[85vh] bg-black rounded-2xl overflow-hidden group"
      onMouseMove={resetControlsTimeout}
      onTouchStart={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Center Play/Pause Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
          <Play className="w-10 h-10 text-white fill-white ml-1" />
        </div>
      </div>

      {/* Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-4 pb-4 pt-14 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          showControls || isScrubbing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar — fully touch-draggable */}
        <div
          ref={progressBarRef}
          className="relative w-full h-6 flex items-center cursor-pointer mb-2 touch-none"
          onPointerDown={handleScrubStart}
          onPointerMove={handleScrubMove}
          onPointerUp={handleScrubEnd}
          onPointerCancel={handleScrubEnd}
        >
          {/* Track background */}
          <div className="absolute left-0 right-0 h-[5px] bg-white/20 rounded-full top-1/2 -translate-y-1/2 overflow-hidden">
            {/* Filled track */}
            <div
              className="h-full bg-neon-cyan rounded-full transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Thumb / scrubber dot */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_12px_#67e8f9] transition-transform duration-100 ${
              isScrubbing ? "scale-125" : "scale-100"
            }`}
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-neon-cyan transition-colors">
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-neon-cyan transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="text-white/80 text-xs sm:text-sm font-mono tracking-tighter">
              {formatTime(currentTime)} <span className="opacity-50">/</span> {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleFullscreen} className="text-white hover:text-neon-cyan transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
