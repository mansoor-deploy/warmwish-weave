
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RsvpFormProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const RsvpForm: React.FC<RsvpFormProps> = ({ theme }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const themeClasses = {
    cozy: {
      container: 'cozy-card mt-8',
      button: 'cozy-button',
      input: 'border-cozy-gold/30 focus:border-cozy-gold focus:ring-cozy-gold/20',
      attendingButton: 'border-cozy-gold text-cozy-gold',
      attendingButtonActive: 'bg-cozy-gold text-white',
    },
    vintage: {
      container: 'vintage-card mt-8',
      button: 'vintage-button',
      input: 'border-vintage-brass/30 focus:border-vintage-brass focus:ring-vintage-brass/20',
      attendingButton: 'border-vintage-brass text-vintage-brass',
      attendingButtonActive: 'bg-vintage-terracotta text-white',
    },
    urban: {
      container: 'urban-card mt-8',
      button: 'urban-button',
      input: 'border-urban-gold/30 bg-black/20 focus:border-urban-gold focus:ring-urban-gold/20 text-white',
      attendingButton: 'border-urban-gold text-urban-gold',
      attendingButtonActive: 'bg-urban-emerald text-white',
    },
    tropical: {
      container: 'tropical-card mt-8',
      button: 'tropical-button',
      input: 'border-tropical-green/30 focus:border-tropical-green focus:ring-tropical-green/20',
      attendingButton: 'border-tropical-green text-tropical-green',
      attendingButtonActive: 'bg-tropical-green text-white',
    },
    royal: {
      container: 'royal-card mt-8',
      button: 'royal-button',
      input: 'border-royal-gold/30 bg-black/20 focus:border-royal-gold focus:ring-royal-gold/20 text-white',
      attendingButton: 'border-royal-gold text-royal-gold',
      attendingButtonActive: 'bg-royal-burgundy text-white',
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || attending === null) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "RSVP Sent!",
        description: attending 
          ? "We're looking forward to seeing you!" 
          : "We're sorry you can't make it, but thank you for letting us know.",
      });
      setIsSubmitting(false);
      // Reset form
      setName('');
      setEmail('');
      setAttending(null);
      setMessage('');
    }, 1000);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${themeClasses[theme].container} animate-scale-in`}>
      <h2 className="text-2xl font-bold mb-6 text-center">RSVP</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 rounded-md bg-white/10 backdrop-blur-sm border ${themeClasses[theme].input}`}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-md bg-white/10 backdrop-blur-sm border ${themeClasses[theme].input}`}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <p className="block mb-2 font-medium">Will you attend? *</p>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`flex items-center justify-center px-4 py-2 rounded-md border transition-colors ${
                attending === true 
                  ? themeClasses[theme].attendingButtonActive
                  : themeClasses[theme].attendingButton
              }`}
            >
              <Check size={18} className="mr-2" />
              Yes, I'll be there
            </button>
            
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`flex items-center justify-center px-4 py-2 rounded-md border transition-colors ${
                attending === false
                  ? themeClasses[theme].attendingButtonActive 
                  : themeClasses[theme].attendingButton
              }`}
            >
              <X size={18} className="mr-2" />
              Sorry, I can't make it
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-2 font-medium">
            Message (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full p-3 rounded-md bg-white/10 backdrop-blur-sm border ${themeClasses[theme].input}`}
            rows={4}
            placeholder="Any notes or well wishes..."
          />
        </div>
        
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${themeClasses[theme].button} flex items-center justify-center min-w-[200px]`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Sending...
              </>
            ) : (
              'Send RSVP'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RsvpForm;
