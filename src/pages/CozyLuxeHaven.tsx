
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

// Define customizable props - these would be set by the user
const defaultProps = {
  hostName: "Sarah & Michael",
  title: "Housewarming Party",
  date: "Saturday, December 12, 2023",
  time: "6:00 PM - 10:00 PM",
  address: "123 Luxury Avenue, Beverly Hills, CA 90210",
  message: "Join us as we celebrate our new home. Your presence is the only gift we need.",
  audioSrc: "/audio/cozy-piano.mp3", // Path to audio file
  videoSrc: "/video/welcome-message.mp4", // Path to video file
};

const CozyLuxeHaven = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
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
    return <LoadingScreen theme="cozy" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="cozy-container invitation-container">
      <AnimatedBackground theme="cozy" />
      <Header theme="cozy" eventDetails={eventDetails} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="relative w-full max-w-3xl mx-auto mb-20 animate-fade-in">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform -rotate-1"></div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1"></div>
          
          <div className="relative bg-white/20 backdrop-blur-md border border-cozy-gold/20 rounded-2xl p-8 md:p-12 shadow-elegant overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cozy-gold/20 via-cozy-gold to-cozy-gold/20"></div>
            
            <InvitationDetails
              hostName={defaultProps.hostName}
              date={defaultProps.date}
              time={defaultProps.time}
              address={defaultProps.address}
              message={defaultProps.message}
              theme="cozy"
            />
          </div>
        </div>
        
        {/* Photo Gallery Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <PhotoGallery theme="cozy" />
        </div>
        
        {/* Avenue Map Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <AvenueMap address={defaultProps.address} theme="cozy" />
        </div>
        
        {/* Blessing Animation */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <BlessingAnimation theme="cozy" onBlessingComplete={handleBlessingComplete} />
        </div>
        
        {/* RSVP Form */}
        <RsvpForm theme="cozy" />
      </main>
      
      <div ref={footerRef}>
        <Footer theme="cozy" />
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

export default CozyLuxeHaven;
