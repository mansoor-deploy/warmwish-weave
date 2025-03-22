
import React from 'react';
import { Link } from 'react-router-dom';

const TemplateSelector = () => {
  const templates = [
    {
      id: 'cozy-luxe-haven',
      name: 'Cozy Luxe Haven',
      description: 'Modern minimalist luxury with elegant neutrals and gold accents.',
      image: '/thumbnails/cozy-luxe.webp',
      path: '/cozy-luxe-haven',
    },
    {
      id: 'vintage-charm-manor',
      name: 'Vintage Charm Manor',
      description: 'Rustic, cozy & elegant design with warm terracotta and cream tones.',
      image: '/thumbnails/vintage-charm.webp',
      path: '/vintage-charm-manor',
    },
    {
      id: 'urban-chic-retreat',
      name: 'Urban Chic Retreat',
      description: 'Modern, stylish city luxe with cool grays and emerald accents.',
      image: '/thumbnails/urban-chic.webp',
      path: '/urban-chic-retreat',
    },
    {
      id: 'tropical-boho-escape',
      name: 'Tropical Boho Escape',
      description: 'Bohemian garden party with earthy greens and soft pinks.',
      image: '/thumbnails/tropical-boho.webp',
      path: '/tropical-boho-escape',
    },
    {
      id: 'royal-heritage-homecoming',
      name: 'Royal Heritage Homecoming',
      description: 'Grand, traditional luxury with royal blue and gold accents.',
      image: '/thumbnails/royal-heritage.webp',
      path: '/royal-heritage-homecoming',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Housewarming Invitation Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our premium, elegant templates to create the perfect invitation for your housewarming celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Link 
              key={template.id}
              to={template.path} 
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors duration-300"></div>
                <img 
                  src={template.image || '/placeholder.svg'} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{template.description}</p>
                <div className="mt-4 text-blue-600 font-medium flex items-center group-hover:underline">
                  Preview template
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
