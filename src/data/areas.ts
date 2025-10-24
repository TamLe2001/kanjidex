import type { Area } from '../types';

export const areas: Area[] = [
  {
    id: 'area-tokyo',
    name: 'Tokyo Gardens',
    region: 'Kanto',
    requiredLevel: 1,
    isUnlocked: true,
    wildKanji: ['kanji-one', 'kanji-two', 'kanji-person', 'kanji-see', 'kanji-hand'],
    description: 'A peaceful garden in Tokyo where beginner Kanji roam'
  },
  {
    id: 'area-kyoto',
    name: 'Kyoto Temple',
    region: 'Kansai',
    requiredLevel: 5,
    isUnlocked: false,
    wildKanji: ['kanji-three', 'kanji-child', 'kanji-flower', 'kanji-walk', 'kanji-eye'],
    description: 'Ancient temples where traditional Kanji dwell'
  },
  {
    id: 'area-osaka',
    name: 'Osaka Market',
    region: 'Kansai',
    requiredLevel: 8,
    isUnlocked: false,
    wildKanji: ['kanji-rice', 'kanji-meat', 'kanji-fish', 'kanji-mouth', 'kanji-vehicle'],
    description: 'A bustling market filled with food-themed Kanji'
  },
  {
    id: 'area-hokkaido',
    name: 'Hokkaido Snowfield',
    region: 'Hokkaido',
    requiredLevel: 12,
    isUnlocked: false,
    wildKanji: ['kanji-snow', 'kanji-rain', 'kanji-white', 'kanji-water', 'kanji-river'],
    description: 'Snowy plains where weather Kanji thrive'
  },
  {
    id: 'area-mount-fuji',
    name: 'Mount Fuji Peak',
    region: 'Chubu',
    requiredLevel: 15,
    isUnlocked: false,
    wildKanji: ['kanji-mountain', 'kanji-sky', 'kanji-fire', 'kanji-tree', 'kanji-forest'],
    description: 'The sacred mountain housing powerful nature Kanji'
  },
  {
    id: 'area-okinawa',
    name: 'Okinawa Beach',
    region: 'Ryukyu',
    requiredLevel: 18,
    isUnlocked: false,
    wildKanji: ['kanji-water', 'kanji-fish', 'kanji-blue', 'kanji-sky', 'kanji-joy'],
    description: 'Tropical beaches with water and emotion Kanji'
  },
  {
    id: 'area-hiroshima',
    name: 'Hiroshima Gardens',
    region: 'Chugoku',
    requiredLevel: 20,
    isUnlocked: false,
    wildKanji: ['kanji-love', 'kanji-mother', 'kanji-father', 'kanji-flower', 'kanji-day'],
    description: 'Peaceful gardens where family Kanji gather'
  },
  {
    id: 'area-sendai',
    name: 'Sendai Forest',
    region: 'Tohoku',
    requiredLevel: 22,
    isUnlocked: false,
    wildKanji: ['kanji-forest', 'kanji-tree', 'kanji-run', 'kanji-car', 'kanji-red'],
    description: 'Dense forests with fast and agile Kanji'
  },
  {
    id: 'area-nagoya',
    name: 'Nagoya Castle',
    region: 'Chubu',
    requiredLevel: 25,
    isUnlocked: false,
    wildKanji: ['kanji-ten', 'kanji-anger', 'kanji-black', 'kanji-year', 'kanji-month'],
    description: 'Historic castle where powerful Kanji train'
  },
  {
    id: 'area-sapporo',
    name: 'Sapporo City',
    region: 'Hokkaido',
    requiredLevel: 30,
    isUnlocked: false,
    wildKanji: ['kanji-now', 'kanji-vehicle', 'kanji-car', 'kanji-meat', 'kanji-snow'],
    description: 'Modern city with transport and time Kanji'
  }
];

export function getAreaById(id: string): Area | undefined {
  return areas.find(area => area.id === id);
}

export function getUnlockedAreas(learnerLevel: number): Area[] {
  return areas.filter(area => area.requiredLevel <= learnerLevel);
}

export function getLockedAreas(learnerLevel: number): Area[] {
  return areas.filter(area => area.requiredLevel > learnerLevel);
}
