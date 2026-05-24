export type HouseName = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

export interface HouseConfig {
  name: HouseName;
  displayName: string;
  primary: string;
  accent: string;
  bg: string;
  muted: string;
  glow: string;
  crest: string;
  motto: string;
  traits: string[];
  textColor: string;
}

export const HOUSE_CONFIGS: Record<HouseName, HouseConfig> = {
  gryffindor: {
    name: 'gryffindor',
    displayName: 'Gryffindor',
    primary: '#740001',
    accent: '#D3A625',
    bg: '#0d0505',
    muted: '#3d1a1a',
    glow: 'rgba(211, 166, 37, 0.35)',
    crest: '/assets/images/gryffindor.png',
    motto: 'Where Dwell the Brave at Heart',
    traits: ['Brave', 'Determined', 'Chivalrous'],
    textColor: '#ffd700',
  },
  slytherin: {
    name: 'slytherin',
    displayName: 'Slytherin',
    primary: '#1a472a',
    accent: '#aaaaaa',
    bg: '#050d08',
    muted: '#0d2b18',
    glow: 'rgba(170, 170, 170, 0.3)',
    crest: '/assets/images/slytherin.png',
    motto: 'You\'ll Make Your Real Friends',
    traits: ['Ambitious', 'Cunning', 'Resourceful'],
    textColor: '#c0c0c0',
  },
  ravenclaw: {
    name: 'ravenclaw',
    displayName: 'Ravenclaw',
    primary: '#0e1a40',
    accent: '#946B2D',
    bg: '#05080d',
    muted: '#091230',
    glow: 'rgba(148, 107, 45, 0.35)',
    crest: '/assets/images/ravenclaw.png',
    motto: 'Wit Beyond Measure is Man\'s Greatest Treasure',
    traits: ['Wise', 'Creative', 'Clever'],
    textColor: '#c09050',
  },
  hufflepuff: {
    name: 'hufflepuff',
    displayName: 'Hufflepuff',
    primary: '#372e29',
    accent: '#ecb939',
    bg: '#0d0a05',
    muted: '#2a2015',
    glow: 'rgba(236, 185, 57, 0.3)',
    crest: '/assets/images/hufflepuff.png',
    motto: 'Those Patient Hufflepuffs are True',
    traits: ['Loyal', 'Hardworking', 'Dedicated'],
    textColor: '#ecb939',
  },
};

export function applyHouseTheme(house: HouseName) {
  const config = HOUSE_CONFIGS[house];
  const root = document.documentElement;
  root.style.setProperty('--house-primary', config.primary);
  root.style.setProperty('--house-accent', config.accent);
  root.style.setProperty('--house-bg', config.bg);
  root.style.setProperty('--house-muted', config.muted);
  root.style.setProperty('--house-glow', config.glow);
}
