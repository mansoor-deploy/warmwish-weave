
import React from 'react';
import { Calendar, Clock, MapPin, Gift } from 'lucide-react';

interface InvitationDetailsProps {
  hostName: string;
  date: string;
  time: string;
  address: string;
  message: string;
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const InvitationDetails: React.FC<InvitationDetailsProps> = ({
  hostName,
  date,
  time,
  address,
  message,
  theme
}) => {
  const themeClasses = {
    cozy: {
      container: 'cozy-card',
      heading: 'cozy-heading',
      subheading: 'cozy-subheading',
      text: 'text-cozy-charcoal',
      icon: 'text-cozy-gold',
    },
    vintage: {
      container: 'vintage-card',
      heading: 'vintage-heading',
      subheading: 'vintage-subheading',
      text: 'text-vintage-terracotta',
      icon: 'text-vintage-brass',
    },
    urban: {
      container: 'urban-card',
      heading: 'urban-heading',
      subheading: 'urban-subheading',
      text: 'text-white',
      icon: 'text-urban-gold',
    },
    tropical: {
      container: 'tropical-card',
      heading: 'tropical-heading',
      subheading: 'tropical-subheading',
      text: 'text-tropical-wood',
      icon: 'text-tropical-green',
    },
    royal: {
      container: 'royal-card',
      heading: 'royal-heading',
      subheading: 'royal-subheading',
      text: 'text-white',
      icon: 'text-royal-gold',
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${themeClasses[theme].container} animate-scale-in`}>
      <div className="text-center mb-8">
        <h1 className={themeClasses[theme].heading}>Housewarming</h1>
        <p className={themeClasses[theme].subheading}>You're invited to celebrate with {hostName}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Calendar className={`flex-shrink-0 ${themeClasses[theme].icon}`} size={28} />
          <div>
            <h3 className="font-medium text-lg">Date</h3>
            <p className={`${themeClasses[theme].text} text-lg`}>{date}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Clock className={`flex-shrink-0 ${themeClasses[theme].icon}`} size={28} />
          <div>
            <h3 className="font-medium text-lg">Time</h3>
            <p className={`${themeClasses[theme].text} text-lg`}>{time}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MapPin className={`flex-shrink-0 ${themeClasses[theme].icon}`} size={28} />
          <div>
            <h3 className="font-medium text-lg">Location</h3>
            <p className={`${themeClasses[theme].text} text-lg`}>{address}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Gift className={`flex-shrink-0 ${themeClasses[theme].icon}`} size={28} />
          <div>
            <h3 className="font-medium text-lg">Message</h3>
            <p className={`${themeClasses[theme].text} text-lg`}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationDetails;
