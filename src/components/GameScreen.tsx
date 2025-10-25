import { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import AreaExplorer from './AreaExplorer';
import Shop from './Shop';
import Team from './Team';
import LearnerSidebar from './LearnerSidebar';
import './GameScreen.css';

type Screen = 'areas' | 'battle' | 'shop' | 'kanji';

export default function GameScreen() {
  const { gameState, unlockAreas } = useGame();
  const [currentScreen, setCurrentScreen] = useState<Screen>('areas');

  useEffect(() => {
    unlockAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.learner.level]);

  return (
    <div className="game-screen">
      <LearnerSidebar />
      
      <div className="main-container">
        <header className="game-header">
          <h1 className="header-title">🈯 KanjiDex</h1>
        </header>

        <nav className="game-nav">
          <button
            className={`nav-button ${currentScreen === 'areas' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('areas')}
          >
            🗾 Areas
          </button>
          <button
            className={`nav-button ${currentScreen === 'battle' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('battle')}
          >
            ⚔️ Battle
          </button>
          <button
            className={`nav-button ${currentScreen === 'kanji' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('kanji')}
          >
            📖 Kanji
          </button>
          <button
            className={`nav-button ${currentScreen === 'shop' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('shop')}
          >
            🏪 Shop
          </button>
        </nav>

        <main className="game-content">
          {currentScreen === 'areas' && <AreaExplorer mode="explore" />}
          {currentScreen === 'battle' && <AreaExplorer mode="battle" />}
          {currentScreen === 'kanji' && <Team />}
          {currentScreen === 'shop' && <Shop />}
        </main>
      </div>
    </div>
  );
}
