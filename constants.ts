import { AccessibilityProfile, POI } from './types';

export const CREDENTIALS = {
  username: 'guest',
  password: 'zoo'
};

// Points of Interest with fun emojis and coordinates aligned to the new SVG map
export const ZOO_POIS: POI[] = [
  {
    id: 'entrance',
    name: 'Main Entrance',
    emoji: '🎟️',
    type: 'exit',
    x: 50,
    y: 90,
    description: 'Welcome! Main entry and exit point.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Wheelchair and ECV rentals are available immediately to the right. The entry plaza is paved and flat.',
      [AccessibilityProfile.VISUAL]: 'Tactile maps are available at Guest Services. Large print guides can be requested here.',
      [AccessibilityProfile.AUDITORY]: 'Ticket counters are equipped with induction loops (T-Coil). Written transcripts of the daily schedule are available.',
      [AccessibilityProfile.SENSORY]: 'This area can be crowded and loud during opening (9-10 AM). A "Quiet Entry" lane is available upon request.',
      [AccessibilityProfile.COGNITIVE]: 'Staff in green shirts are here to help. Pick up a "Lost Parent" sticker for children here.'
    }
  },
  {
    id: 'elephants',
    name: 'Asian Elephant Habitat',
    emoji: '🐘',
    type: 'animal',
    x: 20,
    y: 60,
    description: 'Home to our herd of playful Asian elephants.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'The main path is wide concrete. A gentle ramp leads to the upper viewing deck for an elevated view.',
      [AccessibilityProfile.VISUAL]: 'There is a life-size bronze elephant statue near the entry for tactile exploration. Audio descriptions of elephant training sessions are available via QR code.',
      [AccessibilityProfile.AUDITORY]: 'Elephant keeper talks at 11 AM include a whiteboard summary of key facts.',
      [AccessibilityProfile.SENSORY]: 'Strong animal odors are present here. A "Low Sensory" viewing area is located behind the large barn, away from the crowds.',
      [AccessibilityProfile.COGNITIVE]: 'Picture boards explain the family tree of the elephant herd. Look for the "Trunk" icon to find the viewing spots.'
    }
  },
  {
    id: 'primates',
    name: 'World of Primates',
    emoji: '🐒',
    type: 'animal',
    x: 80,
    y: 55,
    description: 'See lemurs, monkeys, and apes traversing the canopy.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Wooden boardwalks are mostly flat but can be slippery when wet. There is elevator access to the canopy walkway.',
      [AccessibilityProfile.VISUAL]: 'High-contrast safety barriers are in place. Listen for the distinct calls of the Howler Monkeys to orient yourself.',
      [AccessibilityProfile.AUDITORY]: 'Video displays have open captions. Visual alerts (flashing lights) indicate when a keeper demonstration is starting.',
      [AccessibilityProfile.SENSORY]: 'The indoor Monkey House creates echoes. Noise-canceling headphones are recommended. The outdoor path is breezier and quieter.',
      [AccessibilityProfile.COGNITIVE]: 'Simple "Do" and "Do Not" signs with pictures explain how to interact safely near the glass.'
    }
  },
  {
    id: 'giraffes',
    name: 'Giraffe Feeding',
    emoji: '🦒',
    type: 'animal',
    x: 30,
    y: 25,
    description: 'Get eye-to-eye with the tallest land mammals.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'A large elevator is available to take guests up to the feeding platform. The platform has varying railing heights for seated viewing.',
      [AccessibilityProfile.VISUAL]: 'A tactile replica of giraffe skin and bone structure is mounted on the waiting line rail. Staff will guide your hand for feeding.',
      [AccessibilityProfile.AUDITORY]: 'Microphones amplify the keeper\'s voice during feeding times. Assistive Listening Devices (ALDs) are available.',
      [AccessibilityProfile.SENSORY]: 'Feeding involves direct contact with giraffe tongues (wet/sticky). Hand washing stations with low-scent soap are immediately adjacent.',
      [AccessibilityProfile.COGNITIVE]: 'A step-by-step visual guide ("Hold Lettuce", "Wait", "Feed") is posted at the platform entrance.'
    }
  },
  {
    id: 'lions',
    name: 'Lion Lookout',
    emoji: '🦁',
    type: 'animal',
    x: 70,
    y: 25,
    description: 'King of the jungle observation point.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Floor-to-ceiling glass viewing allows for perfect visibility from a seated position. The area is paved and level.',
      [AccessibilityProfile.VISUAL]: 'The "Roar Floor" section vibrates to simulate a lion\'s roar, providing a tactile sound experience.',
      [AccessibilityProfile.AUDITORY]: 'The educational film in the den has subtitles and a sign language interpreter inset.',
      [AccessibilityProfile.SENSORY]: 'Warning: Lions may roar suddenly and loudly. This is a "High Startle" zone. A bypass path is available.',
      [AccessibilityProfile.COGNITIVE]: 'Signs clearly explain that lions sleep up to 20 hours a day, so guests aren\'t disappointed if they are napping.'
    }
  },
  {
    id: 'quiet_zone_1',
    name: 'Reflection Pool',
    emoji: '🧘',
    type: 'amenity',
    x: 50,
    y: 45,
    description: 'A peaceful area to rest and recharge in the center of the zoo.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Benches with back support and armrests are spaced every 10 feet. Plenty of room for turning radius.',
      [AccessibilityProfile.VISUAL]: 'The sound of the fountain provides a consistent auditory landmark for orientation.',
      [AccessibilityProfile.AUDITORY]: 'This is a designated "No Music" zone.',
      [AccessibilityProfile.SENSORY]: 'Designated Quiet Zone. Natural white noise from water features. Cool shade and low visual clutter.',
      [AccessibilityProfile.COGNITIVE]: 'A calm place to take a break. No scheduled activities occur here.'
    }
  },
  {
    id: 'reptile',
    name: 'Reptile House',
    emoji: '🦎',
    type: 'animal',
    x: 80,
    y: 80,
    description: 'Indoor exhibit featuring snakes, lizards, and frogs.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Automatic sliding doors at entrance. All viewing windows start low to the ground.',
      [AccessibilityProfile.VISUAL]: 'Exhibits are brightly backlit against dark surroundings, offering high contrast. Audio buttons describe the color patterns of snakes.',
      [AccessibilityProfile.AUDITORY]: 'Acoustic dampening panels in the ceiling reduce echo. This is generally a quiet building.',
      [AccessibilityProfile.SENSORY]: 'Lighting is dim. The building is climate-controlled (kept cool). There are no strong odors.',
      [AccessibilityProfile.COGNITIVE]: 'Exhibits are color-coded: Red for Venomous, Green for Non-Venomous.'
    }
  },
  {
    id: 'petting_zoo',
    name: 'Children\'s Zoo',
    emoji: '🐐',
    type: 'animal',
    x: 10,
    y: 80,
    description: 'Pet goats and sheep in this interactive area.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Double-gate entry system is wide enough for large wheelchairs. Paved paths, but animal areas have packed dirt.',
      [AccessibilityProfile.VISUAL]: 'Staff are trained to describe the texture of the animals. High contrast "Exit" signs.',
      [AccessibilityProfile.AUDITORY]: 'Whistles are used by staff for animal movement - visual flags accompany these signals.',
      [AccessibilityProfile.SENSORY]: 'High tactile experience (fur/wool). Animal smells are stronger here. Hand sanitizing stations provided.',
      [AccessibilityProfile.COGNITIVE]: '"Gentle Hands" signs with photos demonstrate how to pet the animals safely.'
    }
  },
  {
    id: 'food_court',
    name: 'Cypress Circle Cafe',
    emoji: '🍔',
    type: 'dining',
    x: 45,
    y: 45,
    description: 'Main dining area with burgers, salads, and pizza.',
    accessibilityNotes: {
      [AccessibilityProfile.MOBILITY]: 'Tables have movable chairs for wheelchair access. Ordering counters are at accessible heights.',
      [AccessibilityProfile.VISUAL]: 'Menus are available in Braille and large print. Staff will read menus upon request.',
      [AccessibilityProfile.AUDITORY]: 'Ordering utilizes a number display system, not just audio call-outs.',
      [AccessibilityProfile.SENSORY]: 'Can be chaotic during lunch (11:30-1:00). Outdoor seating near the pond is quieter.',
      [AccessibilityProfile.COGNITIVE]: 'Picture menus are available at the register. Foods are clearly labeled.'
    }
  }
];

export const PROFILE_DESCRIPTIONS = {
  [AccessibilityProfile.NONE]: "Standard zoo experience.",
  [AccessibilityProfile.MOBILITY]: "Step-free routes, elevators, and rest spots.",
  [AccessibilityProfile.VISUAL]: "Audio descriptions, high-contrast, and tactile help.",
  [AccessibilityProfile.AUDITORY]: "Visual alerts, sign language videos, and transcripts.",
  [AccessibilityProfile.SENSORY]: "Quiet zones, crowd warnings, and sensory bags.",
  [AccessibilityProfile.COGNITIVE]: "Simple signs, clear pictures, and helper buttons."
};