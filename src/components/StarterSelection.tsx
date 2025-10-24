import { useState } from 'react';
import { starterKanji } from '../data/kanjiCharacters';
import { useGame } from '../hooks/useGame';
import './StarterSelection.css';

export default function StarterSelection() {
  const [learnerName, setLearnerName] = useState('');
  const [selectedStarter, setSelectedStarter] = useState<number | null>(null);
  const { startGame } = useGame();

  const handleStartGame = () => {
    if (learnerName.trim() && selectedStarter !== null) {
      startGame(learnerName, { ...starterKanji[selectedStarter] });
    }
  };

  return (
    <div className="starter-selection">
      <div className="starter-container">
        <h1 className="game-title">🈯 KanjiDex</h1>
        <p className="subtitle">Welcome, future Learner!</p>
        
        <div className="name-input-section">
          <label htmlFor="learner-name">Enter your name:</label>
          <input
            id="learner-name"
            type="text"
            value={learnerName}
            onChange={(e) => setLearnerName(e.target.value)}
            placeholder="Your name..."
            maxLength={20}
          />
        </div>

        <div className="starter-selection-section">
          <h2>Choose your first Kanji:</h2>
          <div className="starter-grid">
            {starterKanji.map((kanji, index) => (
              <div
                key={kanji.id}
                className={`starter-card ${selectedStarter === index ? 'selected' : ''}`}
                onClick={() => setSelectedStarter(index)}
              >
                <div className="kanji-display">{kanji.character}</div>
                <h3>{kanji.name}</h3>
                <p className="kanji-type">Type: {kanji.type}</p>
                <div className="stats">
                  <div>HP: {kanji.maxHp}</div>
                  <div>Attack: {kanji.attack}</div>
                  <div>Defense: {kanji.defense}</div>
                  <div>Speed: {kanji.speed}</div>
                </div>
                <div className="moves-list">
                  <p className="moves-title">Moves:</p>
                  {kanji.moves.map(move => (
                    <div key={move.id} className="move-item">
                      {move.name} ({move.power})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="start-button"
          onClick={handleStartGame}
          disabled={!learnerName.trim() || selectedStarter === null}
        >
          Begin Your Journey!
        </button>
      </div>
    </div>
  );
}
