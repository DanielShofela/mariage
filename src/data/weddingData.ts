import { PosterData } from '../types';

import heroPosterImg from '../assets/images/wedding_hero_poster_1785602537759.jpg';
import venuePosterImg from '../assets/images/wedding_venue_poster_1785602551581.jpg';
import receptionPosterImg from '../assets/images/wedding_reception_poster_1785602563091.jpg';

export const WEDDING_COUPLE = {
  groom: 'Stéphane',
  bride: 'Laura',
  fullTitle: 'Stéphane & Laura',
  weddingDateISO: '2027-06-20T16:00:00',
  formattedDate: 'Samedi 20 Juin 2027',
  time: '16h00',
  venue: 'Grand Hôtel du Cap-Ferrat',
  address: '71 Boulevard du Général de Gaulle',
  city: 'Saint-Jean-Cap-Ferrat',
  region: 'Côte d’Azur, France',
  contactPhone: '+33612345678',
  whatsappNumber: '33612345678',
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
    date: 'Samedi 20 Juin 2027',
    time: 'À partir de 16:00',
    locationName: 'Grand Hôtel du Cap-Ferrat',
    locationCity: 'Saint-Jean-Cap-Ferrat • Côte d’Azur',
    image: heroPosterImg,
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
    date: '20 Juin 2027',
    time: 'Programme Complet',
    locationName: 'Jardins & Terrasses de la Mer',
    locationCity: 'Presqu’île du Cap-Ferrat',
    image: venuePosterImg,
    quote: '« Entre ciel et mer, un instant d’éternité gravé dans le temps. »',
    details: [
      { label: 'Accueil des Invités', value: '16h00 • Reconstitution d’un bar à rafraîchissements' },
      { label: 'Échange des Vœux', value: '16h30 • Musique de chambre live' },
      { label: 'Soirée Riviera', value: '23h00 • DJ Set & Bar à Champagne' }
    ],
    highlights: ['Vue mer 360°', 'Service Voiturier dédié', 'Hébergements partenaires sur réservation']
  }
];
