
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar } from 'lucide-react';

interface HeaderProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
  eventDetails?: {
    title: string;
    date: string;
    time: string;
    address: string;
  };
}

const Header: React.FC<HeaderProps> = ({ theme, eventDetails }) => {
  const themeClasses = {
    cozy: {
      container: 'bg-cozy-beige/80 text-cozy-charcoal',
      homeButton: 'text-cozy-gold hover:text-cozy-charcoal',
      calendarButton: 'bg-cozy-gold/90 text-white hover:bg-cozy-gold',
    },
    vintage: {
      container: 'bg-vintage-cream/80 text-vintage-terracotta',
      homeButton: 'text-vintage-brass hover:text-vintage-terracotta',
      calendarButton: 'bg-vintage-brass/90 text-white hover:bg-vintage-brass',
    },
    urban: {
      container: 'bg-black/80 text-white',
      homeButton: 'text-urban-gold hover:text-white',
      calendarButton: 'bg-urban-gold/90 text-black hover:bg-urban-gold',
    },
    tropical: {
      container: 'bg-white/80 text-tropical-wood',
      homeButton: 'text-tropical-green hover:text-tropical-wood',
      calendarButton: 'bg-tropical-green/90 text-white hover:bg-tropical-green',
    },
    royal: {
      container: 'bg-royal-blue/80 text-white',
      homeButton: 'text-royal-gold hover:text-white',
      calendarButton: 'bg-royal-gold/90 text-royal-blue hover:bg-royal-gold',
    }
  };

  const createGoogleCalendarLink = () => {
    if (!eventDetails) return '#';

    const { title, date, time, address } = eventDetails;
    
    // Parse date and time to create start and end times
    const eventDate = new Date(date);
    const [startHour, startMinute] = time.split(' - ')[0].match(/(\d+):(\d+)/)?.slice(1).map(Number) || [18, 0];
    const [endHour, endMinute] = time.split(' - ')[1].match(/(\d+):(\d+)/)?.slice(1).map(Number) || [22, 0];
    
    eventDate.setHours(startHour, startMinute);
    const startTime = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    const endDate = new Date(eventDate);
    endDate.setHours(endHour, endMinute);
    const endTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(`Housewarming party`)}&location=${encodeURIComponent(address)}`;
    
    return googleCalendarUrl;
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
        
        {eventDetails && (
          <a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${themeClasses[theme].calendarButton} flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-sm`}
          >
            <Calendar size={16} />
            <span className="hidden sm:inline">Add to Calendar</span>
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
