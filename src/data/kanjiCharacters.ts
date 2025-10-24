import type { KanjiCharacter } from '../types';
import { getAttackMovesByType } from './attackMoves';

// Helper function to create a base Kanji character
function createKanji(
  id: string,
  character: string,
  name: string,
  type: KanjiCharacter['type'],
  baseStats: { hp: number; attack: number; defense: number; speed: number }
): KanjiCharacter {
  const moves = getAttackMovesByType(type).slice(0, 4);
  
  return {
    id,
    character,
    name,
    type,
    level: 5,
    currentExp: 0,
    expToNextLevel: 100,
    maxHp: baseStats.hp,
    currentHp: baseStats.hp,
    attack: baseStats.attack,
    defense: baseStats.defense,
    speed: baseStats.speed,
    moves
  };
}

// Starter Kanji (players choose from these three)
export const starterKanji: KanjiCharacter[] = [
  createKanji('kanji-fire', '火', 'Hi (Fire)', 'Elemental', { 
    hp: 45, attack: 55, defense: 40, speed: 65 
  }),
  createKanji('kanji-water', '水', 'Mizu (Water)', 'Elemental', { 
    hp: 50, attack: 50, defense: 50, speed: 60 
  }),
  createKanji('kanji-tree', '木', 'Ki (Tree)', 'Nature', { 
    hp: 55, attack: 48, defense: 55, speed: 52 
  })
];

// Wild Kanji that can be encountered in various areas
export const wildKanji: KanjiCharacter[] = [
  // Number type
  createKanji('kanji-one', '一', 'Ichi (One)', 'Number', { 
    hp: 35, attack: 30, defense: 30, speed: 40 
  }),
  createKanji('kanji-two', '二', 'Ni (Two)', 'Number', { 
    hp: 40, attack: 35, defense: 32, speed: 42 
  }),
  createKanji('kanji-three', '三', 'San (Three)', 'Number', { 
    hp: 42, attack: 38, defense: 34, speed: 45 
  }),
  createKanji('kanji-ten', '十', 'Juu (Ten)', 'Number', { 
    hp: 50, attack: 45, defense: 40, speed: 50 
  }),
  
  // Family type
  createKanji('kanji-person', '人', 'Hito (Person)', 'Family', { 
    hp: 40, attack: 35, defense: 35, speed: 45 
  }),
  createKanji('kanji-mother', '母', 'Haha (Mother)', 'Family', { 
    hp: 60, attack: 40, defense: 50, speed: 40 
  }),
  createKanji('kanji-father', '父', 'Chichi (Father)', 'Family', { 
    hp: 55, attack: 50, defense: 45, speed: 42 
  }),
  createKanji('kanji-child', '子', 'Ko (Child)', 'Family', { 
    hp: 38, attack: 32, defense: 30, speed: 60 
  }),
  
  // Food type
  createKanji('kanji-rice', '米', 'Kome (Rice)', 'Food', { 
    hp: 48, attack: 40, defense: 42, speed: 45 
  }),
  createKanji('kanji-meat', '肉', 'Niku (Meat)', 'Food', { 
    hp: 52, attack: 55, defense: 38, speed: 48 
  }),
  createKanji('kanji-fish', '魚', 'Sakana (Fish)', 'Food', { 
    hp: 45, attack: 48, defense: 35, speed: 62 
  }),
  
  // Nature type
  createKanji('kanji-mountain', '山', 'Yama (Mountain)', 'Nature', { 
    hp: 70, attack: 50, defense: 65, speed: 30 
  }),
  createKanji('kanji-river', '川', 'Kawa (River)', 'Nature', { 
    hp: 50, attack: 45, defense: 40, speed: 55 
  }),
  createKanji('kanji-flower', '花', 'Hana (Flower)', 'Nature', { 
    hp: 42, attack: 50, defense: 35, speed: 63 
  }),
  createKanji('kanji-forest', '森', 'Mori (Forest)', 'Nature', { 
    hp: 65, attack: 48, defense: 55, speed: 42 
  }),
  
  // Emotion type
  createKanji('kanji-love', '愛', 'Ai (Love)', 'Emotion', { 
    hp: 55, attack: 50, defense: 45, speed: 50 
  }),
  createKanji('kanji-anger', '怒', 'Ikari (Anger)', 'Emotion', { 
    hp: 50, attack: 65, defense: 35, speed: 55 
  }),
  createKanji('kanji-joy', '楽', 'Tanoshii (Joy)', 'Emotion', { 
    hp: 48, attack: 45, defense: 40, speed: 60 
  }),
  
  // Action type
  createKanji('kanji-see', '見', 'Miru (See)', 'Action', { 
    hp: 40, attack: 38, defense: 35, speed: 57 
  }),
  createKanji('kanji-walk', '歩', 'Aruku (Walk)', 'Action', { 
    hp: 45, attack: 40, defense: 40, speed: 55 
  }),
  createKanji('kanji-run', '走', 'Hashiru (Run)', 'Action', { 
    hp: 42, attack: 45, defense: 35, speed: 68 
  }),
  
  // Transport type
  createKanji('kanji-car', '車', 'Kuruma (Car)', 'Transport', { 
    hp: 50, attack: 55, defense: 50, speed: 65 
  }),
  createKanji('kanji-vehicle', '乗', 'Noru (Vehicle)', 'Transport', { 
    hp: 48, attack: 50, defense: 45, speed: 60 
  }),
  
  // Weather type
  createKanji('kanji-rain', '雨', 'Ame (Rain)', 'Weather', { 
    hp: 52, attack: 48, defense: 42, speed: 48 
  }),
  createKanji('kanji-snow', '雪', 'Yuki (Snow)', 'Weather', { 
    hp: 50, attack: 45, defense: 50, speed: 45 
  }),
  createKanji('kanji-sky', '空', 'Sora (Sky)', 'Weather', { 
    hp: 48, attack: 52, defense: 40, speed: 60 
  }),
  
  // Body type
  createKanji('kanji-hand', '手', 'Te (Hand)', 'Body', { 
    hp: 40, attack: 50, defense: 35, speed: 55 
  }),
  createKanji('kanji-eye', '目', 'Me (Eye)', 'Body', { 
    hp: 38, attack: 42, defense: 32, speed: 58 
  }),
  createKanji('kanji-mouth', '口', 'Kuchi (Mouth)', 'Body', { 
    hp: 42, attack: 45, defense: 38, speed: 50 
  }),
  
  // Color type
  createKanji('kanji-red', '赤', 'Aka (Red)', 'Color', { 
    hp: 45, attack: 55, defense: 38, speed: 52 
  }),
  createKanji('kanji-blue', '青', 'Ao (Blue)', 'Color', { 
    hp: 48, attack: 48, defense: 45, speed: 49 
  }),
  createKanji('kanji-white', '白', 'Shiro (White)', 'Color', { 
    hp: 50, attack: 45, defense: 50, speed: 45 
  }),
  createKanji('kanji-black', '黒', 'Kuro (Black)', 'Color', { 
    hp: 52, attack: 58, defense: 40, speed: 50 
  }),
  
  // Time type
  createKanji('kanji-day', '日', 'Hi (Day)', 'Time', { 
    hp: 55, attack: 50, defense: 45, speed: 50 
  }),
  createKanji('kanji-month', '月', 'Tsuki (Month)', 'Time', { 
    hp: 50, attack: 48, defense: 48, speed: 54 
  }),
  createKanji('kanji-year', '年', 'Toshi (Year)', 'Time', { 
    hp: 60, attack: 52, defense: 55, speed: 43 
  }),
  createKanji('kanji-now', '今', 'Ima (Now)', 'Time', { 
    hp: 42, attack: 50, defense: 38, speed: 65 
  })
];

export const allKanji = [...starterKanji, ...wildKanji];

export function getKanjiById(id: string): KanjiCharacter | undefined {
  return allKanji.find(kanji => kanji.id === id);
}

export function getKanjiByType(type: KanjiCharacter['type']): KanjiCharacter[] {
  return allKanji.filter(kanji => kanji.type === type);
}
