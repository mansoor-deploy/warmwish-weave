
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MusicPlayer from '../components/MusicPlayer';
import VideoMessage from '../components/VideoMessage';
import InvitationDetails from '../components/InvitationDetails';
import RsvpForm from '../components/RsvpForm';
import AnimatedBackground from '../components/AnimatedBackground';
import AvenueMap from '../components/AvenueMap';
import BlessingAnimation from '../components/BlessingAnimation';
import LoadingScreen from '../components/LoadingScreen';
import PhotoGallery from '../components/PhotoGallery';
import { Video } from 'lucide-react';

// Define customizable props - these would be set by the user
const defaultProps = {
  hostName: "Olivia & Noah",
  title: "Housewarming Party",
  date: "Saturday, September 16, 2023",
  time: "4:00 PM - 9:00 PM",
  address: "78 Sunflower Street, Miami, FL 33101",
  message: "Join our botanical celebration. Tropical cocktails & plant-based bites will be shared.",
  audioSrc: "/audio/tropical-nature.mp3", // Path to audio file
  videoSrc: "/video/welcome-message.mp4", // Path to video file
};

const TropicalBohoEscape = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoButton, setShowVideoButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check scroll position to determine when to show video button
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerPosition = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Show button when footer is in view
        if (footerPosition < windowHeight) {
          setShowVideoButton(true);
        } else {
          setShowVideoButton(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleBlessingComplete = () => {
    // Open video message when blessing animation completes
    setIsVideoModalOpen(true);
  };

  const eventDetails = {
    title: defaultProps.title,
    date: defaultProps.date,
    time: defaultProps.time,
    address: defaultProps.address
  };

  if (isLoading) {
    return <LoadingScreen theme="tropical" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="tropical-container invitation-container">
      <AnimatedBackground theme="tropical" />
      <Header theme="tropical" eventDetails={eventDetails} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="relative w-full max-w-3xl mx-auto mb-20 animate-fade-in">
          <InvitationDetails
            hostName={defaultProps.hostName}
            date={defaultProps.date}
            time={defaultProps.time}
            address={defaultProps.address}
            message={defaultProps.message}
            theme="tropical"
          />
        </div>
        
        {/* Photo Gallery Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <PhotoGallery theme="tropical" />
        </div>
        
        {/* Avenue Map Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <AvenueMap address={defaultProps.address} theme="tropical" />
        </div>
        
        {/* Blessing Animation */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <BlessingAnimation theme="tropical" onBlessingComplete={handleBlessingComplete} />
        </div>
        
        {/* RSVP Form */}
        <RsvpForm theme="tropical" />
        
        {/* Video button that appears when scrolled to bottom */}
        {showVideoButton && (
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 tropical-button flex items-center space-x-2 animate-fade-in z-30"
            aria-label="Watch welcome video"
          >
            <Video size={20} />
            <span>Watch Welcome Message</span>
          </button>
        )}
      </main>
      
      <div ref={footerRef}>
        <Footer theme="tropical" />
      </div>
      
      {/* Background Music Player */}
      <MusicPlayer audioSrc={defaultProps.audioSrc} isVideoPlaying={isVideoPlaying} />
      
      {/* Video Message Modal */}
      <VideoMessage
        videoSrc={defaultProps.videoSrc}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        setIsVideoPlaying={setIsVideoPlaying}
      />
    </div>
  );
};

export default TropicalBohoEscape;
