import { useGame } from '../hooks/useGame';
import './Team.css';

export default function Team() {
  const { gameState, setPartner } = useGame();

  const handleSetPartner = (kanjiId: string) => {
    const kanji = gameState.learner.caughtKanji.find(k => k.id === kanjiId);
    if (kanji) {
      setPartner(kanji);
    }
  };

  return (
    <div className="team">
      <h2>📖 Your Kanji Collection</h2>
      
      {gameState.learner.partner && (
        <div className="current-partner-section">
          <h3>Current Partner</h3>
          <div className="current-partner-card">
            <div className="kanji-display-large">{gameState.learner.partner.character}</div>
            <h4>{gameState.learner.partner.name}</h4>
            <p className="kanji-level">Level {gameState.learner.partner.level}</p>
            <p className="kanji-type">Type: {gameState.learner.partner.type}</p>
            
            <div className="exp-bar-container">
              <div className="exp-label">EXP</div>
              <div className="exp-bar-bg">
                <div 
                  className="exp-bar" 
                  style={{ width: `${(gameState.learner.partner.currentExp / gameState.learner.partner.expToNextLevel) * 100}%` }}
                />
              </div>
              <div className="exp-text">
                {gameState.learner.partner.currentExp}/{gameState.learner.partner.expToNextLevel}
              </div>
            </div>

            <div className="hp-section">
              <div className="hp-label">HP</div>
              <div className="hp-bar-bg">
                <div 
                  className="hp-bar-fill" 
                  style={{ width: `${(gameState.learner.partner.currentHp / gameState.learner.partner.maxHp) * 100}%` }}
                />
              </div>
              <div className="hp-value">
                {gameState.learner.partner.currentHp}/{gameState.learner.partner.maxHp}
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">ATK</span>
                <span className="stat-value">{gameState.learner.partner.attack}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">DEF</span>
                <span className="stat-value">{gameState.learner.partner.defense}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">SPD</span>
                <span className="stat-value">{gameState.learner.partner.speed}</span>
              </div>
            </div>

            <div className="moves-section">
              <p className="moves-header">Moves:</p>
              {gameState.learner.partner.moves.map(move => (
                <div key={move.id} className="move-row">
                  <span className="move-name">{move.name}</span>
                  <span className="move-power">⚡{move.power}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {gameState.learner.caughtKanji.length === 0 ? (
        <div className="empty-team">
          <p>You haven't caught any Kanji yet!</p>
          <p>Go to the Battle tab to find and capture Kanji characters.</p>
        </div>
      ) : (
        <>
          <h3>All Caught Kanji ({gameState.learner.caughtKanji.length})</h3>
          <p className="switch-instruction">Click on a Kanji to set it as your partner</p>
          
          <div className="team-grid">
            {gameState.learner.caughtKanji.map((kanji) => (
              <div 
                key={kanji.id} 
                className={`team-kanji-card ${gameState.learner.partner?.id === kanji.id ? 'is-partner' : ''}`}
                onClick={() => handleSetPartner(kanji.id)}
              >
                {gameState.learner.partner?.id === kanji.id && (
                  <div className="partner-badge">★ Partner</div>
                )}
                <div className="kanji-display-large">{kanji.character}</div>
                <h4>{kanji.name}</h4>
                <p className="kanji-level">Level {kanji.level}</p>
                <p className="kanji-type">Type: {kanji.type}</p>
                
                <div className="exp-bar-container">
                  <div className="exp-label">EXP</div>
                  <div className="exp-bar-bg">
                    <div 
                      className="exp-bar" 
                      style={{ width: `${(kanji.currentExp / kanji.expToNextLevel) * 100}%` }}
                    />
                  </div>
                  <div className="exp-text">
                    {kanji.currentExp}/{kanji.expToNextLevel}
                  </div>
                </div>

                <div className="hp-section">
                  <div className="hp-label">HP</div>
                  <div className="hp-bar-bg">
                    <div 
                      className="hp-bar-fill" 
                      style={{ width: `${(kanji.currentHp / kanji.maxHp) * 100}%` }}
                    />
                  </div>
                  <div className="hp-value">
                    {kanji.currentHp}/{kanji.maxHp}
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">ATK</span>
                    <span className="stat-value">{kanji.attack}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">DEF</span>
                    <span className="stat-value">{kanji.defense}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">SPD</span>
                    <span className="stat-value">{kanji.speed}</span>
                  </div>
                </div>

                <div className="moves-section">
                  <p className="moves-header">Moves:</p>
                  {kanji.moves.map(move => (
                    <div key={move.id} className="move-row">
                      <span className="move-name">{move.name}</span>
                      <span className="move-power">⚡{move.power}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
