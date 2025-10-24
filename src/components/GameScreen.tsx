import { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import AreaExplorer from './AreaExplorer';
import Shop from './Shop';
import Team from './Team';
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
      <header className="game-header">
        <div className="header-content">
          <h1 className="header-title">🈯 KanjiDex</h1>
          <div className="learner-info">
            <div className="info-item">
              <span className="label">Learner:</span>
              <span className="value">{gameState.learner.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Level:</span>
              <span className="value">{gameState.learner.level}</span>
            </div>
            <div className="info-item">
              <span className="label">EXP:</span>
              <span className="value">
                {gameState.learner.currentExp}/{gameState.learner.expToNextLevel}
              </span>
            </div>
            <div className="info-item">
              <span className="label">💰</span>
              <span className="value">{gameState.learner.currency}</span>
            </div>
            <div className="info-item">
              <span className="label">📜</span>
              <span className="value">{gameState.learner.inventory.ziScrolls}</span>
            </div>
            <div className="info-item">
              <span className="label">🧪</span>
              <span className="value">{gameState.learner.inventory.potions}</span>
            </div>
          </div>
        </div>
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
  );
}
