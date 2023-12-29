import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.scss';

const VideoPlayer: React.FC = () => {
  const videoRef:any = useRef<HTMLVideoElement | null>(null);
  const [resumeTime, setResumeTime] = useState<number | null>(null);
  const [videoDuration, setVideoDuration]:any = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false); // Add this state

  // ... (other event handlers and useEffects)

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setShowOverlay(true); // Show overlay on click
      setTimeout(() => {
        setShowOverlay(false); // Hide overlay after 1 second
      }, 1000);
    }
  };
  const handlePause = () => {
    if (videoRef.current) {
      setResumeTime(videoRef.current.currentTime);
    }
  };
//   const handleWheelSeek = (e: React.WheelEvent<HTMLDivElement>) => {
//     if (videoRef.current && videoDuration !== null) {
//       e.preventDefault();
//       const seekBar = e.currentTarget;
//       const wheelDelta = e.nativeEvent.deltaX || e.nativeEvent.deltaY;
//       const seekOffset = (wheelDelta / seekBar.clientWidth) * videoDuration;
//       const newTime = Math.min(Math.max(videoRef.current.currentTime + seekOffset, 0), videoDuration);
//       videoRef.current.currentTime = newTime;
//     }
//   };
// const handleVideoClick = () => {
//   if (videoRef.current) {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   }
// };
  const handleWheelSeek = (e: React.WheelEvent<HTMLDivElement>) => {
    if (videoRef.current && videoDuration !== null) {
      e.preventDefault();
      const seekBar = e.currentTarget;
      const wheelDelta = e.nativeEvent.deltaX || e.nativeEvent.deltaY;
      const scrollSpeed = wheelDelta > 0 ? 2 : -2; // Adjust scroll speed
      const newTime = Math.min(Math.max(videoRef.current.currentTime + scrollSpeed, 0), videoDuration);
      videoRef.current.currentTime = newTime;
    }
  };
  const handlePlay = () => {
    if (videoRef.current && resumeTime !== null) {
      videoRef.current.currentTime = resumeTime;
      setResumeTime(null);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && videoDuration !== null) {
      const seekBar = e.currentTarget;
      const offsetX = e.nativeEvent.offsetX;
      const newTime = (offsetX / seekBar.clientWidth) * videoDuration;
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (videoRef.current && videoDuration !== null) {
      const updateProgress = () => {
        setCurrentProgress((videoRef.current.currentTime / videoDuration) * 100);
      };
      videoRef.current.addEventListener('timeupdate', updateProgress);
      return () => {
        videoRef.current?.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [videoDuration]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="video-player-container" style={{height:"200px"}}>
      <div className="custom-controls">
        
        <div className="seek-bar" onClick={handleSeek} onWheel={handleWheelSeek}>
          <div className="seek-bar-progress" style={{ width: `${currentProgress}%` }}></div>
        </div>
      <button className="play-pause-button" onClick={handlePlayPause} style={{}}>
          {videoRef.current?.paused ?  <i className="mdi mdi-play" style={{fontSize: "27px"}}></i> : <i className="mdi mdi-pause" style={{fontSize: "27px"}}></i>}
        </button>
        </div>
      <video
        ref={videoRef}
        controls
        onPause={handlePause}
        onPlay={handlePlay}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={handleVideoClick}
      >
        <source src="/videos/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {showOverlay && (
        <div className="overlay-button" onClick={handleVideoClick}>
          {isPlaying ? (
            <i className="mdi mdi-play" style={{fontSize: "60px"}}></i>
          ) : (
            <i className="mdi mdi-pause" style={{fontSize: "60px"}}></i>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
