
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
import { Video } from 'lucide-react';

// Define customizable props - these would be set by the user
const defaultProps = {
  hostName: "Emily & James",
  date: "Sunday, November 5, 2023",
  time: "2:00 PM - 6:00 PM",
  address: "45 Antique Lane, Countryside, VT 05401",
  message: "Help us turn our house into a home with your warm wishes and presence.",
  audioSrc: "/audio/vintage-acoustic.mp3", // Path to audio file
  videoSrc: "/video/welcome-message.mp4", // Path to video file
};

const VintageCharmManor = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoButton, setShowVideoButton] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Trigger scroll open animation after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScrollOpen(true);
    }, 500);
    
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

  return (
    <div className="vintage-container invitation-container">
      <AnimatedBackground theme="vintage" />
      <Header theme="vintage" />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className={`relative w-full max-w-3xl mx-auto mb-20 overflow-hidden transition-all duration-1000 ease-out ${isScrollOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="relative bg-vintage-cream/90 backdrop-blur-sm border-2 border-vintage-brass/30 rounded-md p-8 md:p-12 shadow-elegant">
            <div className="absolute top-0 left-0 w-16 h-16 bg-[url('/backgrounds/scroll-corner.svg')] bg-no-repeat opacity-40"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-[url('/backgrounds/scroll-corner.svg')] bg-no-repeat opacity-40 transform rotate-90"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-[url('/backgrounds/scroll-corner.svg')] bg-no-repeat opacity-40 transform -rotate-90"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-[url('/backgrounds/scroll-corner.svg')] bg-no-repeat opacity-40 transform rotate-180"></div>
            
            <InvitationDetails
              hostName={defaultProps.hostName}
              date={defaultProps.date}
              time={defaultProps.time}
              address={defaultProps.address}
              message={defaultProps.message}
              theme="vintage"
            />
          </div>
        </div>
        
        {/* Avenue Map Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <AvenueMap address={defaultProps.address} theme="vintage" />
        </div>
        
        {/* Blessing Animation */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <BlessingAnimation theme="vintage" />
        </div>
        
        {/* RSVP Form */}
        <RsvpForm theme="vintage" />
        
        {/* Video button that appears when scrolled to bottom */}
        {showVideoButton && (
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 vintage-button flex items-center space-x-2 animate-fade-in z-30"
            aria-label="Watch welcome video"
          >
            <Video size={20} />
            <span>Watch Welcome Message</span>
          </button>
        )}
      </main>
      
      <div ref={footerRef}>
        <Footer theme="vintage" />
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

export default VintageCharmManor;
