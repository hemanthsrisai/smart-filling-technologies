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
      if (isPlaying && !isScrubbing) setShowControls(false);
    }, 3000);
  }, [isPlaying, isScrubbing]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, resetControlsTimeout]);

  // Handle video element duration fallback (e.g. if loaded metadata fired before mount)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleMetadata = () => {
        setDuration(video.duration);
      };
      
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
      
      video.addEventListener("loadedmetadata", handleMetadata);
      return () => {
        video.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isScrubbing) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setCurrentTime(cur);
      setProgress((cur / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = videoRef.current?.parentElement;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const formatTime = (t: number) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Convert coordinate position to seek position
  const seekToPosition = useCallback(
    (clientX: number) => {
      const bar = progressBarRef.current;
      if (!bar || !videoRef.current || !duration) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const pct = (x / rect.width) * 100;
      const time = (pct / 100) * duration;
      
      setProgress(pct);
      setCurrentTime(time);
      videoRef.current.currentTime = time;
    },
    [duration]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only handle primary/left click
    e.stopPropagation();
    setIsScrubbing(true);
    resetControlsTimeout();
    seekToPosition(e.clientX);
  };

  // Listen for global movements during scrubbing
  useEffect(() => {
    if (!isScrubbing) return;

    const handlePointerMove = (e: PointerEvent) => {
      // Prevents page scroll gestures on touch screens
      e.preventDefault();
      seekToPosition(e.clientX);
    };

    const handlePointerUp = () => {
      setIsScrubbing(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isScrubbing, seekToPosition]);

  return (
    <div
      className="custom-video-player relative w-full h-full max-h-[85vh] bg-black rounded-2xl overflow-hidden select-none"
      onMouseMove={resetControlsTimeout}
      onTouchStart={resetControlsTimeout}
      onMouseLeave={() => isPlaying && !isScrubbing && setShowControls(false)}
      onClick={() => togglePlay()}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain"
      />

      {/* Big center play icon when paused */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
          <Play className="w-10 h-10 text-white fill-white ml-1" />
        </div>
      </div>

      {/* ── Controls overlay ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-3 sm:px-4 pb-3 sm:pb-4 pt-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
          showControls || isScrubbing ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Seekbar container */}
        <div
          ref={progressBarRef}
          onPointerDown={handlePointerDown}
          className="relative w-full h-8 flex items-center mb-1 group/seek cursor-pointer touch-none select-none"
        >
          {/* Visual track background */}
          <div className="absolute left-0 right-0 h-[4px] rounded-full bg-white/20 pointer-events-none group-hover/seek:h-[6px] transition-all duration-150" />
          
          {/* Visual filled track */}
          <div
            className="absolute left-0 h-[4px] rounded-full bg-[#67e8f9] pointer-events-none group-hover/seek:h-[6px] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />

          {/* Visual thumb dot (always visible on mobile, visible on hover on desktop) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#67e8f9] shadow-[0_0_8px_#67e8f9] pointer-events-none transition-all duration-150 ${
              isScrubbing ? "scale-125 opacity-100" : "scale-100 opacity-100 sm:opacity-0 sm:group-hover/seek:opacity-100"
            }`}
            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>

        {/* Buttons row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => togglePlay()} className="text-white hover:text-[#67e8f9] transition-colors">
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-[#67e8f9] transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="text-white/80 text-xs sm:text-sm font-mono tracking-tighter select-none">
              {formatTime(currentTime)} <span className="opacity-50">/</span> {formatTime(duration)}
            </div>
          </div>
          <button onClick={toggleFullscreen} className="text-white hover:text-[#67e8f9] transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
