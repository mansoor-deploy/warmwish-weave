
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface HeaderProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const themeClasses = {
    cozy: {
      container: 'bg-cozy-beige/80 text-cozy-charcoal',
      homeButton: 'text-cozy-gold hover:text-cozy-charcoal',
    },
    vintage: {
      container: 'bg-vintage-cream/80 text-vintage-terracotta',
      homeButton: 'text-vintage-brass hover:text-vintage-terracotta',
    },
    urban: {
      container: 'bg-black/80 text-white',
      homeButton: 'text-urban-gold hover:text-white',
    },
    tropical: {
      container: 'bg-white/80 text-tropical-wood',
      homeButton: 'text-tropical-green hover:text-tropical-wood',
    },
    royal: {
      container: 'bg-royal-blue/80 text-white',
      homeButton: 'text-royal-gold hover:text-white',
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 ${themeClasses[theme].container} backdrop-blur-md z-40 py-4 px-6`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className={`${themeClasses[theme].homeButton} transition-colors`}
          aria-label="Home"
        >
          <Home size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
