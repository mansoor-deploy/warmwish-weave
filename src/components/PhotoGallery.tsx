
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  theme: 'cozy' | 'vintage' | 'urban' | 'tropical' | 'royal';
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ theme }) => {
  const themeClasses = {
    cozy: {
      container: 'bg-white/40 border border-cozy-gold/30',
      heading: 'text-cozy-charcoal',
      text: 'text-cozy-charcoal/80',
      card: 'bg-white/70 border-cozy-gold/20',
    },
    vintage: {
      container: 'bg-vintage-cream/60 border-2 border-vintage-brass/30',
      heading: 'text-vintage-terracotta',
      text: 'text-vintage-terracotta/80',
      card: 'bg-vintage-cream/70 border-vintage-brass/20',
    },
    urban: {
      container: 'bg-black/40 border border-urban-gold/30',
      heading: 'text-white',
      text: 'text-white/80',
      card: 'bg-black/70 border-urban-gold/20',
    },
    tropical: {
      container: 'bg-white/40 border border-tropical-green/30',
      heading: 'text-tropical-wood',
      text: 'text-tropical-wood/80',
      card: 'bg-white/70 border-tropical-green/20',
    },
    royal: {
      container: 'bg-royal-blue/40 border border-royal-gold/30',
      heading: 'text-white',
      text: 'text-white/80',
      card: 'bg-royal-blue/70 border-royal-gold/20',
    }
  };

  // Generate placeholder images with theme-specific content
  const images = [
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "The journey begins",
      caption: "Finding the perfect space"
    },
    {
      src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Design and planning",
      caption: "Bringing ideas to life"
    },
    {
      src: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Making it home",
      caption: "Adding personal touches"
    },
    {
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "The final reveal",
      caption: "Come see it in person!"
    }
  ];

  return (
    <div className={`w-full p-6 rounded-xl ${themeClasses[theme].container} shadow-elegant overflow-hidden animate-fade-in`}>
      <h2 className={`text-2xl font-medium mb-6 text-center flex items-center justify-center gap-2 ${themeClasses[theme].heading}`}>
        <Camera size={24} />
        <span>Our Journey Home</span>
      </h2>
      
      <p className={`text-center mb-8 ${themeClasses[theme].text}`}>
        From dreams to reality - a glimpse of our path to our new home. The final reveal awaits your visit!
      </p>
      
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className={`border ${themeClasses[theme].card} overflow-hidden`}>
                  <CardContent className="flex flex-col items-center justify-center p-0">
                    <div className="relative w-full aspect-video overflow-hidden">
                      {index === images.length - 1 ? (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col items-center justify-center text-white p-6">
                          <ImageIcon size={48} className="mb-4 opacity-80" />
                          <h3 className="text-xl font-medium mb-2">The Final Reveal</h3>
                          <p className="text-center">Join us at our housewarming to see the complete transformation!</p>
                        </div>
                      ) : (
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <div className="p-4 w-full">
                      <h3 className={`font-medium text-lg ${themeClasses[theme].heading}`}>{image.caption}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default PhotoGallery;
