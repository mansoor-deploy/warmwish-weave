
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface AvenueMapProps {
  address: string;
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const AvenueMap: React.FC<AvenueMapProps> = ({ address, theme }) => {
  const themeClasses = {
    cozy: {
      container: 'bg-white/80 border border-cozy-gold/30',
      heading: 'text-cozy-charcoal',
      map: 'bg-cozy-beige/30',
      button: 'cozy-button',
      icon: 'text-cozy-gold',
    },
    vintage: {
      container: 'bg-vintage-cream/80 border-2 border-vintage-brass/30',
      heading: 'text-vintage-terracotta',
      map: 'bg-vintage-cream/60',
      button: 'vintage-button',
      icon: 'text-vintage-brass',
    },
    urban: {
      container: 'bg-black/50 border border-urban-gold/30',
      heading: 'text-white',
      map: 'bg-gray-800/60',
      button: 'urban-button',
      icon: 'text-urban-gold',
    },
    tropical: {
      container: 'bg-white/80 border border-tropical-green/30',
      heading: 'text-tropical-wood',
      map: 'bg-tropical-green/10',
      button: 'tropical-button',
      icon: 'text-tropical-green',
    },
    royal: {
      container: 'bg-royal-blue/40 border border-royal-gold/30',
      heading: 'text-white',
      map: 'bg-royal-blue/20',
      button: 'royal-button',
      icon: 'text-royal-gold',
    }
  };

  // Get coordinates from address (this would be implemented with a geocoding service in production)
  const getMapImageUrl = (address: string) => {
    // In a real app, you would use Google Maps or Mapbox API here
    // For now, returning a placeholder
    return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(address)}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(address)}&key=YOUR_API_KEY`;
  };

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <div className={`w-full rounded-xl overflow-hidden ${themeClasses[theme].container} shadow-elegant p-6 animate-fade-in`}>
      <h3 className={`text-xl font-medium mb-4 flex items-center ${themeClasses[theme].heading}`}>
        <MapPin className={`mr-2 ${themeClasses[theme].icon}`} size={20} />
        Find Your Way
      </h3>
      
      <div className={`relative w-full h-64 rounded-lg overflow-hidden mb-4 ${themeClasses[theme].map}`}>
        {/* This would be replaced with an actual map component in production */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-center px-6">
            <MapPin size={24} className="mx-auto mb-2" />
            {address}
          </p>
        </div>
      </div>
      
      <button 
        onClick={handleGetDirections}
        className={`${themeClasses[theme].button} w-full flex items-center justify-center`}
      >
        <Navigation size={18} className="mr-2" />
        Get Directions
      </button>
    </div>
  );
};

export default AvenueMap;
