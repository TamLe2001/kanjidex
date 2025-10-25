import { useState } from 'react';
import { useGame } from '../hooks/useGame';
import type { KanjiType } from '../types';
import { getCorrectReading } from '../data/hiraganaReadings';
import './Team.css';

export default function Team() {
  const { gameState, setPartner } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<KanjiType | 'All'>('All');

  const handleSetPartner = (kanjiId: string) => {
    const kanji = gameState.learner.caughtKanji.find(k => k.id === kanjiId);
    if (kanji) {
      setPartner(kanji);
    }
  };

  const playKanjiSound = (kanjiId: string) => {
    const reading = getCorrectReading(kanjiId);
    if (reading && 'speechSynthesis' in window) {
      // Cancel any currently playing speech to prevent queuing
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(reading);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Filter kanji based on search term and type filter
  const filteredKanji = gameState.learner.caughtKanji.filter(kanji => {
    const matchesSearch = searchTerm === '' || 
      kanji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kanji.character.includes(searchTerm);
    const matchesType = typeFilter === 'All' || kanji.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Get unique types from caught kanji
  const availableTypes: (KanjiType | 'All')[] = ['All', ...Array.from(new Set(gameState.learner.caughtKanji.map(k => k.type)))];


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
            
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <span className="stat-label">HP</span>
                <span className="stat-value">{gameState.learner.partner.currentHp}/{gameState.learner.partner.maxHp}</span>
              </div>
              <div className="stat-item-compact">
                <span className="stat-label">ATK</span>
                <span className="stat-value">{gameState.learner.partner.attack}</span>
              </div>
              <div className="stat-item-compact">
                <span className="stat-label">DEF</span>
                <span className="stat-value">{gameState.learner.partner.defense}</span>
              </div>
              <div className="stat-item-compact">
                <span className="stat-label">SPD</span>
                <span className="stat-value">{gameState.learner.partner.speed}</span>
              </div>
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
          
          <div className="kanji-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search kanji..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-box">
              <label htmlFor="type-filter">Type: </label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as KanjiType | 'All')}
                className="type-filter"
              >
                {availableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="switch-instruction">Click on a Kanji to set it as your partner • Click 🔊 to hear pronunciation</p>
          
          <div className="team-grid">
            {filteredKanji.map((kanji) => (
              <div 
                key={kanji.id} 
                className={`team-kanji-card ${gameState.learner.partner?.id === kanji.id ? 'is-partner' : ''}`}
              >
                {gameState.learner.partner?.id === kanji.id && (
                  <div className="partner-badge">★ Partner</div>
                )}
                <button 
                  className="sound-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playKanjiSound(kanji.id);
                  }}
                  title="Play pronunciation"
                >
                  🔊
                </button>
                <div onClick={() => handleSetPartner(kanji.id)}>
                  <div className="kanji-display">{kanji.character}</div>
                  <h4>{kanji.name}</h4>
                  <p className="kanji-level">Level {kanji.level}</p>
                  <p className="kanji-type">Type: {kanji.type}</p>
                  
                  <div className="stats-grid-compact">
                    <div className="stat-item-compact">
                      <span className="stat-label">ATK</span>
                      <span className="stat-value">{kanji.attack}</span>
                    </div>
                    <div className="stat-item-compact">
                      <span className="stat-label">DEF</span>
                      <span className="stat-value">{kanji.defense}</span>
                    </div>
                    <div className="stat-item-compact">
                      <span className="stat-label">SPD</span>
                      <span className="stat-value">{kanji.speed}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
