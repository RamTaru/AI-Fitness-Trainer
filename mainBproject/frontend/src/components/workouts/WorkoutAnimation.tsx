import React, { useRef, useEffect } from 'react';

interface WorkoutAnimationProps {
  exerciseName: string;
  isPlaying: boolean;
  // We add a new prop to receive the video URL
  videoUrl?: string | null;
}

const WorkoutAnimation: React.FC<WorkoutAnimationProps> = ({ exerciseName, isPlaying, videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use an effect to control play/pause based on the isPlaying prop
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        {videoUrl ? (
          <video
            ref={videoRef}
            key={videoUrl} // Use key to force re-render when video source changes
            className="w-full h-full object-cover"
            loop
            muted
            playsInline // Important for autoplay on mobile devices
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback content if no video is provided
          <div className="text-gray-400">No video available</div>
        )}
      </div>
      <div className="absolute top-2 right-2">
        <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
      </div>
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
        {exerciseName}
      </div>
    </div>
  );
};

export default WorkoutAnimation;