
import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const themeClasses = {
    cozy: {
      container: 'bg-cozy-beige/80 text-cozy-charcoal',
      highlight: 'text-cozy-gold',
    },
    vintage: {
      container: 'bg-vintage-cream/80 text-vintage-terracotta',
      highlight: 'text-vintage-brass',
    },
    urban: {
      container: 'bg-black/80 text-white',
      highlight: 'text-urban-gold',
    },
    tropical: {
      container: 'bg-white/80 text-tropical-wood',
      highlight: 'text-tropical-green',
    },
    royal: {
      container: 'bg-royal-blue/80 text-white',
      highlight: 'text-royal-gold',
    }
  };

  return (
    <footer className={`${themeClasses[theme].container} backdrop-blur-md py-4 px-6 mt-20`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="mr-2">Made with</span>
          <Heart size={16} className={themeClasses[theme].highlight} fill="currentColor" />
          <span className="ml-2">for your special moment</span>
        </div>
        
        <div className="text-sm">
          <span>© {new Date().getFullYear()} Housewarming Invitations. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
