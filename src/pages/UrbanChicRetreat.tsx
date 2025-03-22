
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
import { Video, Clock, Calendar } from 'lucide-react';

// Define customizable props - these would be set by the user
const defaultProps = {
  hostName: "Alex & Jordan",
  title: "Housewarming Party",
  date: "Friday, October 20, 2023",
  time: "8:00 PM - Late",
  address: "1200 Metropolitan Lofts, New York, NY 10001",
  message: "Celebrate with us in our new urban sanctuary. Cocktails and hors d'oeuvres will be served.",
  audioSrc: "/audio/urban-ambient.mp3", // Path to audio file
  videoSrc: "/video/welcome-message.mp4", // Path to video file
};

const UrbanChicRetreat = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoButton, setShowVideoButton] = useState(false);
  const [countdownDays, setCountdownDays] = useState(0);
  const [countdownHours, setCountdownHours] = useState(0);
  const [countdownMinutes, setCountdownMinutes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate countdown timer (sample implementation)
  useEffect(() => {
    // Set event date - for demo purposes, set to 10 days from now
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 10);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdownDays(days);
      setCountdownHours(hours);
      setCountdownMinutes(minutes);
    }, 1000);
    
    return () => clearInterval(timer);
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
    return <LoadingScreen theme="urban" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="urban-container invitation-container">
      <AnimatedBackground theme="urban" />
      <Header theme="urban" eventDetails={eventDetails} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        {/* Countdown Timer */}
        <div className="w-full max-w-md mx-auto mb-12 bg-black/40 backdrop-blur-md rounded-xl p-6 border border-urban-gold/30 animate-fade-in">
          <p className="text-center text-white/80 mb-3 flex items-center justify-center">
            <Clock size={18} className="mr-2 text-urban-gold" />
            Countdown to the Celebration
          </p>
          <div className="flex justify-center space-x-6 text-center">
            <div>
              <div className="text-4xl font-bold text-white">{countdownDays}</div>
              <div className="text-xs uppercase text-white/70">Days</div>
            </div>
            <div className="text-2xl text-urban-gold font-light self-start mt-2">:</div>
            <div>
              <div className="text-4xl font-bold text-white">{countdownHours}</div>
              <div className="text-xs uppercase text-white/70">Hours</div>
            </div>
            <div className="text-2xl text-urban-gold font-light self-start mt-2">:</div>
            <div>
              <div className="text-4xl font-bold text-white">{countdownMinutes}</div>
              <div className="text-xs uppercase text-white/70">Minutes</div>
            </div>
          </div>
        </div>
        
        <div className="relative w-full max-w-3xl mx-auto mb-20 animate-slide-in-right">
          <InvitationDetails
            hostName={defaultProps.hostName}
            date={defaultProps.date}
            time={defaultProps.time}
            address={defaultProps.address}
            message={defaultProps.message}
            theme="urban"
          />
        </div>
        
        {/* Avenue Map Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <AvenueMap address={defaultProps.address} theme="urban" />
        </div>
        
        {/* Blessing Animation */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <BlessingAnimation theme="urban" onBlessingComplete={handleBlessingComplete} />
        </div>
        
        {/* RSVP Form */}
        <RsvpForm theme="urban" />
        
        {/* Video button that appears when scrolled to bottom */}
        {showVideoButton && (
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 urban-button flex items-center space-x-2 animate-fade-in z-30"
            aria-label="Watch welcome video"
          >
            <Video size={20} />
            <span>Watch Welcome Message</span>
          </button>
        )}
      </main>
      
      <div ref={footerRef}>
        <Footer theme="urban" />
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

export default UrbanChicRetreat;
