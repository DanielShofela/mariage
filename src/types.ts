export interface PosterData {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  locationName: string;
  locationCity: string;
  image: string;
  badge: string;
  details: {
    label: string;
    value: string;
  }[];
  highlights?: string[];
  quote?: string;
}

export interface TouchPoint {
  id: number;
  x: number;
  y: number;
}

export interface RsvpFormData {
  fullName: string;
  attending: 'yes' | 'no';
  guestCount: number;
  guestNames: string;
  dietary: string;
  shuttleNeeded: boolean;
  songRequest: string;
  message: string;
}
