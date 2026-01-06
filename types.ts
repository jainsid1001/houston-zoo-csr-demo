export enum AccessibilityProfile {
  NONE = 'None',
  MOBILITY = 'Mobility',
  VISUAL = 'Visual',
  AUDITORY = 'Auditory',
  SENSORY = 'Sensory',
  COGNITIVE = 'Cognitive'
}

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  profiles: AccessibilityProfile[]; // Changed from single profile to array
}

export interface POI {
  id: string;
  name: string;
  emoji: string;
  type: 'animal' | 'amenity' | 'exit' | 'dining';
  x: number;
  y: number;
  description: string;
  accessibilityNotes: {
    [key in AccessibilityProfile]?: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}