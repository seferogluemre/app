export interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  priceLevel: string;
  location: string;
  description: string;
}

export const PLACES: Place[] = [
  {
    id: '1',
    name: 'Aura Dining',
    category: 'Fine Dining',
    rating: 4.9,
    location: 'Zeytinburnu, Istanbul',
    priceLevel: '$$$$',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    description: 'A sensory journey through modern Mediterranean cuisine.',
  },
  {
    id: '2',
    name: 'Vesper Lounge',
    category: 'Boutique Bar',
    rating: 4.8,
    location: 'Bebek, Istanbul',
    priceLevel: '$$$',
    image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&q=80&w=800',
    description: 'Exclusive cocktails in a minimalist, underground setting.',
  },
  {
    id: '3',
    name: 'Ethos Space',
    category: 'Creative Hub',
    rating: 4.7,
    location: 'Kadikoy, Istanbul',
    priceLevel: '$$',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    description: 'Where art meets community in the heart of the city.',
  },
];
