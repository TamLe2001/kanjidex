import { createContext } from 'react';
import type { GameState, Learner, KanjiCharacter, Area } from '../types';

export interface GameContextType {
  gameState: GameState;
  startGame: (learnerName: string, starterKanji: KanjiCharacter) => void;
  updateLearner: (updates: Partial<Learner>) => void;
  addToTeam: (kanji: KanjiCharacter) => void;
  addToCaughtKanji: (kanji: KanjiCharacter) => void;
  purchaseItem: (itemId: string, cost: number) => boolean;
  selectArea: (area: Area) => void;
  unlockAreas: () => void;
  healAllTeam: () => void;
  gainLearnerExp: (exp: number) => void;
  updateTeamKanji: (index: number, kanji: KanjiCharacter) => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);
