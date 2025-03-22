
import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Film } from 'lucide-react';

interface BlessingAnimationProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
  onBlessingComplete?: () => void;
}

const BlessingAnimation: React.FC<BlessingAnimationProps> = ({ theme, onBlessingComplete }) => {
  const [blessingSent, setBlessingSent] = useState(false);
  const [showVideoHint, setShowVideoHint] = useState(false);
  const blessingsRef = useRef<HTMLDivElement>(null);
  
  const themeClasses = {
    cozy: {
      container: 'bg-white/40 border border-cozy-gold/30',
      heading: 'text-cozy-charcoal',
      text: 'text-cozy-charcoal/80',
      button: 'cozy-button',
      particleColor: '#D4AF37', // Gold
      particleShape: 'heart',
    },
    vintage: {
      container: 'bg-vintage-cream/60 border-2 border-vintage-brass/30',
      heading: 'text-vintage-terracotta',
      text: 'text-vintage-terracotta/80',
      button: 'vintage-button',
      particleColor: '#CD8C52', // Brass
      particleShape: 'star',
    },
    urban: {
      container: 'bg-black/40 border border-urban-gold/30',
      heading: 'text-white',
      text: 'text-white/80',
      button: 'urban-button',
      particleColor: '#FFD700', // Gold
      particleShape: 'circle',
    },
    tropical: {
      container: 'bg-white/40 border border-tropical-green/30',
      heading: 'text-tropical-wood',
      text: 'text-tropical-wood/80',
      button: 'tropical-button',
      particleColor: '#4CAF50', // Green
      particleShape: 'leaf',
    },
    royal: {
      container: 'bg-royal-blue/40 border border-royal-gold/30',
      heading: 'text-white',
      text: 'text-white/80',
      button: 'royal-button',
      particleColor: '#FFD700', // Gold
      particleShape: 'sparkle',
    }
  };

  // Create floating animation particles
  const createFloatingParticle = () => {
    if (!blessingsRef.current) return;
    
    const particle = document.createElement('div');
    particle.className = 'absolute bg-no-repeat bg-center';
    
    // Set size based on theme
    const size = theme === 'royal' ? 12 + Math.random() * 8 : 16 + Math.random() * 16;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Apply theme-specific particle styling
    const particleType = themeClasses[theme].particleShape;
    const particleColor = themeClasses[theme].particleColor;
    
    if (particleType === 'heart') {
      particle.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${particleColor}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    } else if (particleType === 'star') {
      particle.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${particleColor}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    } else if (particleType === 'circle') {
      particle.style.background = particleColor;
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.8';
      particle.style.boxShadow = `0 0 10px ${particleColor}`;
    } else if (particleType === 'leaf') {
      particle.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${particleColor}"><path d="M21 3C21 9 15 13 9 13C9 9 13 3 21 3Z"></path><path d="M21 3C15 3 9 9 9 15C3 15 3 9 3 3C9 3 15 3 21 3Z"></path></svg>`;
    } else if (particleType === 'sparkle') {
      particle.style.background = particleColor;
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = `0 0 10px ${particleColor}, 0 0 20px ${particleColor}`;
      particle.style.filter = 'blur(1px)';
    }
    
    // Random position and animation
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = '0';
    particle.style.opacity = '0';
    
    // Animation duration
    const duration = 3 + Math.random() * 4;
    
    // Create and append keyframes for this specific particle
    const styleSheet = document.styleSheets[0];
    const keyframeName = `float-${Math.floor(Math.random() * 1000)}`;
    const keyframes = `
      @keyframes ${keyframeName} {
        0% { opacity: 0; transform: translate(0, 0); }
        10% { opacity: 0.8; }
        100% { opacity: 0; transform: translate(${(Math.random() * 100) - 50}px, -${100 + Math.random() * 150}px) rotate(${Math.random() * 360}deg); }
      }
    `;
    
    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
      // Fallback if insertRule fails
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      // Clean up style element
      setTimeout(() => document.head.removeChild(style), duration * 1000);
    }
    
    particle.style.animation = `${keyframeName} ${duration}s ease-out forwards`;
    
    blessingsRef.current.appendChild(particle);
    
    // Remove after animation completes
    setTimeout(() => {
      if (blessingsRef.current && blessingsRef.current.contains(particle)) {
        blessingsRef.current.removeChild(particle);
      }
    }, duration * 1000);
  };

  const sendBlessing = () => {
    if (blessingSent) return;
    
    setBlessingSent(true);
    
    // Create multiple floating particles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createFloatingParticle();
      }, i * 120);
    }
    
    // Show video hint after 1 second
    setTimeout(() => {
      setShowVideoHint(true);
    }, 1000);
    
    // Call onBlessingComplete after animation finishes
    setTimeout(() => {
      if (onBlessingComplete) {
        onBlessingComplete();
      }
      
      // Reset states after animation completes
      setTimeout(() => {
        setBlessingSent(false);
        setShowVideoHint(false);
      }, 1000);
    }, 4000);
  };

  return (
    <div className={`relative w-full p-6 rounded-xl ${themeClasses[theme].container} shadow-elegant overflow-hidden`}>
      <div ref={blessingsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particles will be added here dynamically */}
      </div>
      
      <h3 className={`text-xl font-medium mb-2 text-center ${themeClasses[theme].heading}`}>
        Send a Blessing
      </h3>
      
      <p className={`text-center mb-6 ${themeClasses[theme].text}`}>
        Your positive thoughts and wishes will bring warmth to our new home.
      </p>
      
      <button 
        onClick={sendBlessing}
        disabled={blessingSent}
        className={`${themeClasses[theme].button} mx-auto flex items-center justify-center ${blessingSent ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {theme === 'royal' ? (
          <Sparkles size={20} className="mr-2" />
        ) : (
          <Heart size={20} className="mr-2" />
        )}
        {blessingSent ? 'Blessing Sent!' : 'Send a Blessing'}
      </button>
      
      {/* Video hint message that appears during animation */}
      {showVideoHint && (
        <div className="mt-4 text-center animate-fade-in">
          <p className={`flex items-center justify-center gap-2 ${themeClasses[theme].text} font-medium`}>
            <Film size={18} className="animate-pulse" />
            <span>Preparing a special message for you...</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BlessingAnimation;
