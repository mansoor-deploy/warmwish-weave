
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoMessageProps {
  videoSrc: string;
  isOpen: boolean;
  onClose: () => void;
  setIsVideoPlaying: (isPlaying: boolean) => void;
}

const VideoMessage: React.FC<VideoMessageProps> = ({ 
  videoSrc, 
  isOpen, 
  onClose,
  setIsVideoPlaying
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle video load event
  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  // Handle play/pause
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback was prevented:", error);
      });
      setIsVideoPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }

    return () => {
      setIsVideoPlaying(false);
    };
  }, [isOpen, setIsVideoPlaying]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsVideoPlaying(false);
    };
  }, [setIsVideoPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-8">
      <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        <video 
          ref={videoRef}
          src={videoSrc} 
          className="w-full h-full object-cover"
          controls
          onLoadedData={handleVideoLoaded}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoMessage;
