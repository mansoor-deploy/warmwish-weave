
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
import { Video, Crown } from 'lucide-react';

// Define customizable props - these would be set by the user
const defaultProps = {
  hostName: "Raj & Priya",
  date: "Saturday, December 30, 2023",
  time: "7:00 PM - 11:00 PM",
  address: "600 Royal Gardens, Boston, MA 02108",
  message: "The honor of your presence is requested as we celebrate our new home.",
  audioSrc: "/audio/royal-orchestral.mp3", // Path to audio file
  videoSrc: "/video/welcome-message.mp4", // Path to video file
};

const RoyalHeritageHomecoming = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoButton, setShowVideoButton] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Open curtain animation after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCurtainOpen(true);
    }, 800);
    
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
    <div className="royal-container invitation-container">
      <AnimatedBackground theme="royal" />
      <Header theme="royal" />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        {/* Royal Curtain Effect */}
        <div className="relative w-full max-w-3xl mx-auto h-24 mb-12 overflow-hidden">
          <div className={`absolute inset-0 flex transition-transform duration-1500 ease-out ${isCurtainOpen ? 'translate-x-[-100%]' : ''}`}>
            <div className="w-1/2 h-full bg-curtain"></div>
          </div>
          <div className={`absolute inset-0 flex justify-end transition-transform duration-1500 ease-out ${isCurtainOpen ? 'translate-x-[100%]' : ''}`}>
            <div className="w-1/2 h-full bg-curtain"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Crown size={40} className="text-royal-gold" />
          </div>
        </div>
        
        <div className={`relative w-full max-w-3xl mx-auto mb-20 transform transition-all duration-1000 ${isCurtainOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 rounded-lg bg-shimmer-gold opacity-30 bg-[length:200%_100%] animate-shimmer"></div>
          
          <InvitationDetails
            hostName={defaultProps.hostName}
            date={defaultProps.date}
            time={defaultProps.time}
            address={defaultProps.address}
            message={defaultProps.message}
            theme="royal"
          />
        </div>
        
        {/* Avenue Map Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <AvenueMap address={defaultProps.address} theme="royal" />
        </div>
        
        {/* Blessing Animation */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <BlessingAnimation theme="royal" />
        </div>
        
        {/* RSVP Form */}
        <RsvpForm theme="royal" />
        
        {/* Video button that appears when scrolled to bottom */}
        {showVideoButton && (
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 royal-button flex items-center space-x-2 animate-fade-in z-30"
            aria-label="Watch welcome video"
          >
            <Video size={20} />
            <span>Watch Welcome Message</span>
          </button>
        )}
      </main>
      
      <div ref={footerRef}>
        <Footer theme="royal" />
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

export default RoyalHeritageHomecoming;
