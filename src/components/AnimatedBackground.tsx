
import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // For themes with particle effects
  useEffect(() => {
    if (!containerRef.current || theme !== 'royal') return;
    
    const container = containerRef.current;
    
    // Create sparkle elements for the royal theme
    if (theme === 'royal') {
      for (let i = 0; i < 30; i++) {
        createSparkle(container);
      }
    }
    
    return () => {
      // Clean up
      if (container) {
        const sparkles = container.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => sparkle.remove());
      }
    };
  }, [theme]);
  
  // Create sparkle element
  const createSparkle = (container: HTMLDivElement) => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Random positions and sizes
    const size = Math.random() * 8 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.background = '#FFD700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.position = 'absolute';
    sparkle.style.filter = 'blur(1px)';
    sparkle.style.boxShadow = '0 0 10px #FFD700, 0 0 20px #FFD700';
    
    // Position
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    
    // Animation
    sparkle.style.opacity = '0';
    sparkle.style.animation = `sparkle-fade ${Math.random() * 3 + 2}s linear infinite`;
    sparkle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(sparkle);
    
    return sparkle;
  };

  // Render different backgrounds based on theme
  const renderBackground = () => {
    switch (theme) {
      case 'cozy':
        return (
          <div className="absolute inset-0 bg-cozy-beige bg-[url('/backgrounds/cozy-pattern.svg')] opacity-20"></div>
        );
        
      case 'vintage':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-vintage-cream opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/backgrounds/vintage-texture.svg')] opacity-30"></div>
          </div>
        );
        
      case 'urban':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-800"></div>
            <div className="absolute inset-0 bg-[url('/backgrounds/grid-pattern.svg')] opacity-20"></div>
          </div>
        );
        
      case 'tropical':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-tropical-green/5"></div>
            <div className="absolute inset-0 bg-[url('/backgrounds/tropical-pattern.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[url('/backgrounds/leaf.svg')] bg-no-repeat bg-right-top opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[url('/backgrounds/leaf-2.svg')] bg-no-repeat bg-left-bottom opacity-20"></div>
          </div>
        );
        
      case 'royal':
        return (
          <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-royal-blue/90 to-black"></div>
            <div className="absolute inset-0 bg-[url('/backgrounds/royal-pattern.svg')] bg-repeat opacity-10"></div>
            
            {/* Sparkle animation is added dynamically */}
            <style jsx>{`
              @keyframes sparkle-fade {
                0%, 100% { opacity: 0; transform: translateY(0); }
                50% { opacity: 0.8; transform: translateY(-20px); }
              }
            `}</style>
          </div>
        );
        
      default:
        return <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200"></div>;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {renderBackground()}
    </div>
  );
};

export default AnimatedBackground;
