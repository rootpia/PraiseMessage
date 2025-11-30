import type { PraiseImage } from '../types';

// Using placeholder images for now. 
// In a real app, these would be local assets or hosted images.
const MOCK_IMAGES: PraiseImage[] = [
    { id: 'img1', url: 'https://placehold.co/600x400/orange/white?text=Thank+You', alt: 'Thank You' },
    { id: 'img2', url: 'https://placehold.co/600x400/green/white?text=Great+Job', alt: 'Great Job' },
    { id: 'img3', url: 'https://placehold.co/600x400/blue/white?text=Awesome', alt: 'Awesome' },
    { id: 'img4', url: 'https://placehold.co/600x400/purple/white?text=Congrats', alt: 'Congrats' },
    { id: 'img5', url: 'https://placehold.co/600x400/red/white?text=You+Rock', alt: 'You Rock' },
];

export const imageService = {
    getImages: (): PraiseImage[] => {
        return MOCK_IMAGES;
    },

    getImageById: (id: string): PraiseImage | undefined => {
        return MOCK_IMAGES.find(img => img.id === id);
    }
};
