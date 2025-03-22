
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MusicPlayer from '../components/MusicPlayer';
import VideoMessage from '../components/VideoMessage';
import InvitationDetails from '../components/InvitationDetails';
import RsvpForm from '../components/RsvpForm';
import AnimatedBackground from '../components/AnimatedBackground';
import { Video, Flower, GlassWater } from 'lucide-react';

// Define customizable props - these would be set by the user
const defaultProps = {
  hostName: "Olivia & Noah",
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
  const [blessingSent, setBlessingSent] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const blessingsRef = useRef<HTMLDivElement>(null);
  
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

  // Floating leaf animation
  const createFloatingLeaf = () => {
    if (!blessingsRef.current) return;
    
    const leaf = document.createElement('div');
    leaf.className = 'absolute w-8 h-8 bg-contain bg-no-repeat bg-center animate-float opacity-0';
    
    // Randomly choose one of three leaf images
    const leafIndex = Math.floor(Math.random() * 3) + 1;
    leaf.style.backgroundImage = `url('/backgrounds/leaf-${leafIndex}.svg')`;
    
    // Random position
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.bottom = '0';
    
    // Random animation duration
    const duration = 3 + Math.random() * 4;
    leaf.style.animation = `float ${duration}s ease-in-out`;
    
    blessingsRef.current.appendChild(leaf);
    
    // Fade in
    setTimeout(() => {
      leaf.style.opacity = '0.8';
    }, 100);
    
    // Remove after animation completes
    setTimeout(() => {
      if (blessingsRef.current && blessingsRef.current.contains(leaf)) {
        blessingsRef.current.removeChild(leaf);
      }
    }, duration * 1000);
  };

  const sendBlessing = () => {
    setBlessingSent(true);
    
    // Create multiple floating leaves
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        createFloatingLeaf();
      }, i * 300);
    }
    
    // Reset blessing state after animation
    setTimeout(() => {
      setBlessingSent(false);
    }, 5000);
  };

  return (
    <div className="tropical-container invitation-container">
      <AnimatedBackground theme="tropical" />
      <Header theme="tropical" />
      
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
        
        {/* RSVP Form */}
        <RsvpForm theme="tropical" />
        
        {/* Blessing Animation */}
        <div className="mt-16 text-center relative">
          <div ref={blessingsRef} className="absolute inset-0 overflow-hidden">
            {/* Leaves will be dynamically added here */}
          </div>
          
          <h3 className="text-2xl font-medium text-tropical-wood mb-4">Send a Blessing</h3>
          <p className="text-tropical-wood/80 mb-6 max-w-md mx-auto">
            Click below to send positive energy and good wishes to our new home.
          </p>
          
          <button 
            onClick={sendBlessing}
            disabled={blessingSent}
            className={`tropical-button flex items-center mx-auto ${blessingSent ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Flower size={20} className="mr-2" />
            {blessingSent ? 'Blessing Sent!' : 'Send a Blessing'}
          </button>
        </div>
        
        {/* Drinks Preference */}
        <div className="mt-12 text-center">
          <button 
            className="button-secondary border border-tropical-green/50 text-tropical-green flex items-center mx-auto"
          >
            <GlassWater size={20} className="mr-2" />
            Let Us Know Your Drink Preferences
          </button>
        </div>
        
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
