import { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import AreaExplorer from './AreaExplorer';
import Shop from './Shop';
import Team from './Team';
import LearnerSidebar from './LearnerSidebar';
import './GameScreen.css';

type Screen = 'areas' | 'shop' | 'team';

export default function GameScreen() {
  const { gameState, healAllTeam, unlockAreas } = useGame();
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
            className={`nav-button ${currentScreen === 'team' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('team')}
          >
            👥 Team ({gameState.learner.team.length}/6)
          </button>
          <button
            className={`nav-button ${currentScreen === 'shop' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('shop')}
          >
            🏪 Shop
          </button>
          <button
            className="nav-button heal-button"
            onClick={healAllTeam}
          >
            ❤️ Heal All
          </button>
        </nav>

        <main className="game-content">
          {currentScreen === 'areas' && <AreaExplorer />}
          {currentScreen === 'team' && <Team />}
          {currentScreen === 'shop' && <Shop />}
        </main>
      </div>
    </div>
  );
}
