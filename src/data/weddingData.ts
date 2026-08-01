import { PosterData } from '../types';

import heroPosterImg from '../assets/images/wedding_hero_poster.png';
import venuePosterImg from '../assets/images/wedding_venue_poster.png';

// Fallback high-definition images if local assets fail to load
const HERO_IMAGE_URL =
  typeof heroPosterImg === 'string'
    ? heroPosterImg
    : (heroPosterImg as any)?.default ||
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';

const VENUE_IMAGE_URL =
  typeof venuePosterImg === 'string'
    ? venuePosterImg
    : (venuePosterImg as any)?.default ||
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80';

export const WHATSAPP_LINK =
  'https://wa.me/2250759373798?text=Bonjour%20%F0%9F%91%8B%2C%20je%20souhaite%20confirmer%20ma%20pr%C3%A9sence%20%C3%A0%20votre%20mariage.%0A%0ANom%20%3A%20________________%0ANombre%20de%20personnes%20%3A%20_____%0A%0AMerci%20et%20%C3%A0%20tr%C3%A8s%20bient%C3%B4t%20%E2%9D%A4%EF%B8%8F';

export const WEDDING_COUPLE = {
  groom: 'Stéphane',
  bride: 'Laura',
  fullTitle: 'Stéphane & Laura',
  weddingDateISO: '2026-08-29T16:00:00',
  formattedDate: 'Samedi 29 Août 2026',
  dateShort: '29.08.2026',
  time: '16h00',
  venue: 'Grand Hôtel du Cap-Ferrat',
  address: '71 Boulevard du Général de Gaulle',
  city: 'Saint-Jean-Cap-Ferrat',
  region: 'Côte d’Azur, France',
  contactPhone: '+2250759373798',
  whatsappNumber: '2250759373798',
  whatsappUrl: WHATSAPP_LINK,
  dressCode: 'Tenue de Soirée & Élégance Estivale (Nuances de blanc, bleu pastel et sable)',
  googleMapsUrl: 'https://maps.google.com/?q=Grand+Hotel+du+Cap+Ferrat+Saint+Jean+Cap+Ferrat',
  wazeUrl: 'https://waze.com/ul?q=Grand+Hotel+du+Cap+Ferrat',
};

export const POSTERS: PosterData[] = [
  {
    id: 'invitation-principale',
    badge: 'L’Union',
    tagline: 'Luxe, Amour & Lumière',
    title: 'Stéphane & Laura',
    subtitle: 'Ont le bonheur de vous inviter à célébrer leur mariage',
    date: 'Samedi 29 Août 2026',
    time: 'À partir de 16:00',
    locationName: 'Grand Hôtel du Cap-Ferrat',
    locationCity: 'Saint-Jean-Cap-Ferrat • Côte d’Azur',
    image: HERO_IMAGE_URL,
    quote: '« Deux âmes unies sous la lumière éternelle de la Méditerranée. »',
    details: [
      { label: 'Cérémonie Laïque', value: '16h30 au Belvédère' },
      { label: 'Cocktail Riviera', value: '18h00 aux Jardins' },
      { label: 'Dîner de Gala', value: '20h30 Sous les Étoiles' }
    ],
    highlights: ['Cérémonie panoramique', 'Cocktail au coucher du soleil', 'Soirée dansante & Feux d’artifice']
  },
  {
    id: 'lieu-programme',
    badge: 'L’Écrin & Rituels',
    tagline: 'Une Expérience Inoubliable',
    title: 'Le Domaine du Cap',
    subtitle: 'Un cadre d’exception au bord de l’eau',
    date: '29 Août 2026',
    time: 'Programme Complet',
    locationName: 'Jardins & Terrasses de la Mer',
    locationCity: 'Presqu’île du Cap-Ferrat',
    image: VENUE_IMAGE_URL,
    quote: '« Entre ciel et mer, un instant d’éternité gravé dans le temps. »',
    details: [
      { label: 'Accueil des Invités', value: '16h00 • Reconstitution d’un bar à rafraîchissements' },
      { label: 'Échange des Vœux', value: '16h30 • Musique de chambre live' },
      { label: 'Soirée Riviera', value: '23h00 • DJ Set & Bar à Champagne' }
    ],
    highlights: ['Vue mer 360°', 'Service Voiturier dédié', 'Hébergements partenaires sur réservation']
  }
];


