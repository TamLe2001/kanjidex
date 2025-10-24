import { useGame } from '../hooks/useGame';
import './Team.css';

export default function Team() {
  const { gameState } = useGame();

  return (
    <div className="team">
      <h2>👥 Your Team</h2>
      
      {gameState.learner.team.length === 0 ? (
        <div className="empty-team">
          <p>You don't have any Kanji in your team yet!</p>
          <p>Explore areas to find and capture Kanji characters.</p>
        </div>
      ) : (
        <>
          <div className="team-grid">
            {gameState.learner.team.map((kanji, index) => (
              <div key={`${kanji.id}-${index}`} className="team-kanji-card">
                <div className="kanji-display-large">{kanji.character}</div>
                <h3>{kanji.name}</h3>
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

          <div className="team-summary">
            <p>Team Size: {gameState.learner.team.length}/6</p>
            <p>Total Kanji Caught: {gameState.learner.caughtKanji.length}</p>
          </div>
        </>
      )}
    </div>
  );
}
