// KanjiDex Game Type Definitions

export type KanjiType = 
  | 'Number'
  | 'Family'
  | 'Food'
  | 'Nature'
  | 'Emotion'
  | 'Action'
  | 'Elemental'
  | 'Transport'
  | 'Clothing'
  | 'Weather'
  | 'Body'
  | 'Color'
  | 'Time';

export interface AttackMove {
  id: string;
  name: string;
  power: number;
  type: KanjiType;
  description: string;
}

export interface KanjiCharacter {
  id: string;
  character: string;
  name: string;
  type: KanjiType;
  level: number;
  currentExp: number;
  expToNextLevel: number;
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: AttackMove[];
}

export interface Area {
  id: string;
  name: string;
  region: string;
  requiredLevel: number;
  isUnlocked: boolean;
  wildKanji: string[]; // IDs of Kanji that can be encountered
  description: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'scroll' | 'potion' | 'other';
}

export interface Learner {
  id: string;
  name: string;
  level: number;
  currentExp: number;
  expToNextLevel: number;
  currency: number;
  team: KanjiCharacter[];
  inventory: {
    ziScrolls: number;
    potions: number;
  };
  caughtKanji: KanjiCharacter[];
}

export interface GameState {
  learner: Learner;
  currentArea: Area | null;
  areas: Area[];
  isInBattle: boolean;
  hasStarted: boolean;
}
