import { useGame } from '../hooks/useGame';
import './LearnerSidebar.css';

export default function LearnerSidebar() {
  const { gameState } = useGame();

  return (
    <aside className="learner-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>Learner Profile</h2>
        </div>
        
        <div className="learner-details">
          <div className="detail-item name">
            <span className="detail-label">Name</span>
            <span className="detail-value">{gameState.learner.name}</span>
          </div>
          
          <div className="detail-item level">
            <span className="detail-label">Level</span>
            <span className="detail-value">{gameState.learner.level}</span>
          </div>
          
          <div className="detail-item exp">
            <span className="detail-label">Experience</span>
            <div className="exp-bar-container">
              <div 
                className="exp-bar" 
                style={{ width: `${(gameState.learner.currentExp / gameState.learner.expToNextLevel) * 100}%` }}
              />
            </div>
            <span className="detail-value">
              {gameState.learner.currentExp} / {gameState.learner.expToNextLevel}
            </span>
          </div>
          
          <div className="detail-item currency">
            <span className="detail-label">💰 Currency</span>
            <span className="detail-value">{gameState.learner.currency}</span>
          </div>
          
          <div className="detail-item scrolls">
            <span className="detail-label">📜 ZiScrolls</span>
            <span className="detail-value">{gameState.learner.inventory.ziScrolls}</span>
          </div>
          
          <div className="detail-item potions">
            <span className="detail-label">🧪 Potions</span>
            <span className="detail-value">{gameState.learner.inventory.potions}</span>
          </div>
          
          <div className="detail-item partner">
            <span className="detail-label">⭐ Partner</span>
            <span className="detail-value">
              {gameState.learner.partner ? gameState.learner.partner.character : 'None'}
            </span>
          </div>
          
          <div className="detail-item caught">
            <span className="detail-label">📖 Kanji Caught</span>
            <span className="detail-value">{gameState.learner.caughtKanji.length}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
