import { useState } from 'react';
import type { ReactNode } from 'react';
import type { GameState, Learner, KanjiCharacter, Area } from '../types';
import { areas } from '../data/areas';
import { fullHealKanji } from '../utils/gameLogic';
import { GameContext } from './context';

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    learner: {
      id: 'learner-1',
      name: '',
      level: 1,
      currentExp: 0,
      expToNextLevel: 100,
      currency: 500,
      partner: null, // Single partner instead of team
      inventory: {
        ziScrolls: 5,
        potions: 3
      },
      caughtKanji: []
    },
    currentArea: null,
    areas: areas,
    isInBattle: false,
    hasStarted: false
  });

  const startGame = (learnerName: string, starterKanji: KanjiCharacter) => {
    setGameState(prev => ({
      ...prev,
      learner: {
        ...prev.learner,
        name: learnerName,
        partner: starterKanji, // Set as partner
        caughtKanji: [starterKanji]
      },
      hasStarted: true
    }));
  };

  const updateLearner = (updates: Partial<Learner>) => {
    setGameState(prev => ({
      ...prev,
      learner: { ...prev.learner, ...updates }
    }));
  };

  const setPartner = (kanji: KanjiCharacter) => {
    setGameState(prev => ({
      ...prev,
      learner: {
        ...prev.learner,
        partner: kanji
      }
    }));
  };

  const addToCaughtKanji = (kanji: KanjiCharacter) => {
    setGameState(prev => ({
      ...prev,
      learner: {
        ...prev.learner,
        caughtKanji: [...prev.learner.caughtKanji, kanji]
      }
    }));
  };

  const purchaseItem = (itemId: string, cost: number): boolean => {
    if (gameState.learner.currency < cost) {
      return false;
    }

    setGameState(prev => ({
      ...prev,
      learner: {
        ...prev.learner,
        currency: prev.learner.currency - cost,
        inventory: {
          ...prev.learner.inventory,
          ziScrolls: itemId.includes('scroll') 
            ? prev.learner.inventory.ziScrolls + 1 
            : prev.learner.inventory.ziScrolls,
          potions: itemId.includes('potion') 
            ? prev.learner.inventory.potions + 1 
            : prev.learner.inventory.potions
        }
      }
    }));
    return true;
  };

  const selectArea = (area: Area) => {
    setGameState(prev => ({
      ...prev,
      currentArea: area
    }));
  };

  const unlockAreas = () => {
    setGameState(prev => {
      const updatedAreas = prev.areas.map(area => ({
        ...area,
        isUnlocked: area.requiredLevel <= prev.learner.level
      }));
      return {
        ...prev,
        areas: updatedAreas
      };
    });
  };

  const healPartner = () => {
    setGameState(prev => ({
      ...prev,
      learner: {
        ...prev.learner,
        partner: prev.learner.partner ? fullHealKanji(prev.learner.partner) : null
      }
    }));
  };

  const gainLearnerExp = (exp: number) => {
    setGameState(prev => {
      const updatedLearner = { ...prev.learner };
      updatedLearner.currentExp += exp;

      while (updatedLearner.currentExp >= updatedLearner.expToNextLevel) {
        updatedLearner.currentExp -= updatedLearner.expToNextLevel;
        updatedLearner.level += 1;
        updatedLearner.expToNextLevel = Math.floor(updatedLearner.expToNextLevel * 1.3);
        updatedLearner.currency += 100; // Bonus currency on level up
      }

      return {
        ...prev,
        learner: updatedLearner
      };
    });
  };

  const updatePartner = (kanji: KanjiCharacter) => {
    setGameState(prev => {
      // Also update in caughtKanji
      const caughtIndex = prev.learner.caughtKanji.findIndex(k => k.id === kanji.id);
      const updatedCaught = [...prev.learner.caughtKanji];
      if (caughtIndex !== -1) {
        updatedCaught[caughtIndex] = kanji;
      }
      
      return {
        ...prev,
        learner: {
          ...prev.learner,
          partner: kanji,
          caughtKanji: updatedCaught
        }
      };
    });
  };

  return (
    <GameContext.Provider 
      value={{ 
        gameState, 
        startGame, 
        updateLearner, 
        setPartner, 
        addToCaughtKanji,
        purchaseItem,
        selectArea,
        unlockAreas,
        healPartner,
        gainLearnerExp,
        updatePartner
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
