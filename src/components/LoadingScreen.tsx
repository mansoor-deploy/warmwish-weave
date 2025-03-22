
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { Progress } from './ui/progress';

interface LoadingScreenProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ theme, onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  const themeClasses = {
    cozy: {
      background: 'bg-cozy-beige',
      text: 'text-cozy-charcoal',
      highlight: 'text-cozy-gold',
      progressTrack: 'bg-white/30',
      progressBar: 'bg-cozy-gold'
    },
    vintage: {
      background: 'bg-vintage-cream',
      text: 'text-vintage-terracotta',
      highlight: 'text-vintage-brass',
      progressTrack: 'bg-white/30',
      progressBar: 'bg-vintage-brass'
    },
    urban: {
      background: 'bg-black',
      text: 'text-white',
      highlight: 'text-urban-gold',
      progressTrack: 'bg-white/10',
      progressBar: 'bg-urban-gold'
    },
    tropical: {
      background: 'bg-white',
      text: 'text-tropical-wood',
      highlight: 'text-tropical-green',
      progressTrack: 'bg-tropical-green/10',
      progressBar: 'bg-tropical-green'
    },
    royal: {
      background: 'bg-royal-blue',
      text: 'text-white',
      highlight: 'text-royal-gold',
      progressTrack: 'bg-white/10',
      progressBar: 'bg-royal-gold'
    }
  };

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Complete loading after a small delay once 100% is reached
        setTimeout(() => {
          onComplete();
        }, 500);
      }
      setProgress(currentProgress);
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 ${themeClasses[theme].background} flex flex-col items-center justify-center`}>
      <div className="relative">
        <Loader size={48} className={`${themeClasses[theme].highlight} animate-spin mb-8`} />
      </div>
      
      <h2 className={`text-2xl font-medium mb-6 ${themeClasses[theme].text}`}>Preparing your invitation...</h2>
      
      <div className="w-64 mb-2">
        <Progress 
          value={progress} 
          className={`h-2 ${themeClasses[theme].progressTrack}`}
          indicatorClassName={themeClasses[theme].progressBar}
        />
      </div>
      
      <p className={`text-sm ${themeClasses[theme].text} opacity-80`}>
        {progress.toFixed(0)}% complete
      </p>
    </div>
  );
};

export default LoadingScreen;
