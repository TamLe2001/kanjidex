import { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { getKanjiById } from '../data/kanjiCharacters';
import { getRandomWildKanji, calculateDamage, isFainted, attemptCapture, gainExp } from '../utils/gameLogic';
import { getQuizOptions, getCorrectReading } from '../data/hiraganaReadings';
import type { KanjiCharacter } from '../types';
import './AreaExplorer.css';

interface AreaExplorerProps {
  mode: 'explore' | 'battle';
}

// Helper function to play kanji pronunciation
const playKanjiSound = (kanjiId: string) => {
  const reading = getCorrectReading(kanjiId);
  if (reading && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(reading);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
};

export default function AreaExplorer({ mode }: AreaExplorerProps) {
  const { gameState, selectArea, addToCaughtKanji, updateLearner, gainLearnerExp, updatePartner, healPartner } = useGame();
  const [wildKanji, setWildKanji] = useState<KanjiCharacter | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleResult, setBattleResult] = useState<'ongoing' | 'won' | 'lost' | 'captured'>('ongoing');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [capturedKanji, setCapturedKanji] = useState<KanjiCharacter | null>(null);

  const handleExploreArea = (areaId: string) => {
    const area = gameState.areas.find(a => a.id === areaId);
    if (!area || !area.isUnlocked) return;
    selectArea(area);
  };

  const handleStartBattle = (areaId: string) => {
    const area = gameState.areas.find(a => a.id === areaId);
    if (!area || !area.isUnlocked || !gameState.learner.partner) return;

    selectArea(area);

    // Get random wild Kanji
    const wildKanjiIds = area.wildKanji.map(id => getKanjiById(id)).filter(k => k !== undefined) as KanjiCharacter[];
    const wild = getRandomWildKanji(wildKanjiIds, selectedLevel);
    
    setWildKanji(wild);
    setBattleLog([`A wild Kanji appeared!`]); // Don't show name
    setIsPlayerTurn(true);
    setBattleResult('ongoing');

    // Play the wild kanji's pronunciation
    playKanjiSound(wild.id);
  };

  const handleAttack = (moveIndex: number) => {
    if (!wildKanji || !isPlayerTurn || !gameState.learner.partner) return;

    const playerKanji = gameState.learner.partner;
    const move = playerKanji.moves[moveIndex];
    
    if (!move) return;

    // Player attacks
    const damage = calculateDamage(playerKanji, wildKanji, move);
    const updatedWild = { 
      ...wildKanji, 
      currentHp: Math.max(0, wildKanji.currentHp - damage) 
    };
    setWildKanji(updatedWild);
    
    const newLog = [...battleLog, `${playerKanji.name} used ${move.name}! Dealt ${damage} damage.`];
    setBattleLog(newLog);

    if (isFainted(updatedWild)) {
      // Battle won
      const expGained = Math.floor(updatedWild.level * 20);
      const currencyGained = Math.floor(updatedWild.level * 15);
      
      const updatedPlayerKanji = gainExp(playerKanji, expGained);
      updatePartner(updatedPlayerKanji);
      
      updateLearner({
        currency: gameState.learner.currency + currencyGained
      });
      
      gainLearnerExp(Math.floor(updatedWild.level * 5));
      
      setBattleLog([
        ...newLog,
        `Wild Kanji fainted!`,
        `${playerKanji.name} gained ${expGained} EXP!`,
        `You earned ${currencyGained} currency!`
      ]);
      setBattleResult('won');
      
      // Auto-heal partner after battle
      setTimeout(() => {
        healPartner();
      }, 1000);
      return;
    }

    // Enemy's turn
    setIsPlayerTurn(false);
    setTimeout(() => {
      enemyAttack(updatedWild, newLog);
    }, 1000);
  };

  const enemyAttack = (currentWild: KanjiCharacter, currentLog: string[]) => {
    if (!gameState.learner.partner) return;
    
    const playerKanji = gameState.learner.partner;
    const enemyMove = currentWild.moves[Math.floor(Math.random() * currentWild.moves.length)];
    
    const damage = calculateDamage(currentWild, playerKanji, enemyMove);
    const updatedPlayer = { 
      ...playerKanji, 
      currentHp: Math.max(0, playerKanji.currentHp - damage) 
    };
    
    updatePartner(updatedPlayer);
    
    const newLog = [...currentLog, `Wild Kanji used ${enemyMove.name}! Dealt ${damage} damage.`];
    setBattleLog(newLog);

    if (isFainted(updatedPlayer)) {
      setBattleLog([...newLog, `${playerKanji.name} fainted! You lost the battle.`]);
      setBattleResult('lost');
      
      // Auto-heal partner after battle
      setTimeout(() => {
        healPartner();
      }, 1000);
      return;
    }

    setIsPlayerTurn(true);
  };

  const handleCapture = () => {
    if (!wildKanji || !isPlayerTurn || gameState.learner.inventory.ziScrolls <= 0) return;

    updateLearner({
      inventory: {
        ...gameState.learner.inventory,
        ziScrolls: gameState.learner.inventory.ziScrolls - 1
      }
    });

    const captured = attemptCapture(wildKanji);
    
    if (captured) {
      const caughtKanji = { ...wildKanji, currentHp: wildKanji.maxHp };
      setCapturedKanji(caughtKanji);
      
      // Show quiz to identify the kanji
      const options = getQuizOptions(wildKanji.id);
      setQuizOptions(options);
      setShowQuiz(true);
      
      setBattleLog([
        ...battleLog,
        `You used a ZiScroll!`,
        `Success! The Kanji was captured!`,
        `Now identify the Kanji to add it to your collection!`
      ]);
    } else {
      setBattleLog([
        ...battleLog,
        `You used a ZiScroll!`,
        `The Kanji broke free!`
      ]);
      
      // Enemy's turn after failed capture
      setIsPlayerTurn(false);
      setTimeout(() => {
        enemyAttack(wildKanji, [...battleLog, `You used a ZiScroll!`, `The Kanji broke free!`]);
      }, 1000);
    }
  };

  const handleQuizAnswer = (selectedAnswer: string) => {
    if (!capturedKanji) return;
    
    const correctAnswer = getCorrectReading(capturedKanji.id);
    
    if (selectedAnswer === correctAnswer) {
      // Correct answer
      addToCaughtKanji(capturedKanji);
      
      setBattleLog([
        ...battleLog,
        `Correct! ${capturedKanji.character} (${capturedKanji.name}) has been added to your collection!`
      ]);
      setBattleResult('captured');
      setShowQuiz(false);
      
      // Auto-heal partner after battle
      setTimeout(() => {
        healPartner();
      }, 1000);
    } else {
      // Wrong answer - kanji escapes
      setBattleLog([
        ...battleLog,
        `Incorrect! The Kanji escaped!`
      ]);
      setShowQuiz(false);
      setWildKanji(null);
      setBattleResult('ongoing');
    }
  };

  const handleRunAway = () => {
    setWildKanji(null);
    setBattleLog([]);
    setBattleResult('ongoing');
    setShowQuiz(false);
  };

  const handleNewBattle = () => {
    if (gameState.currentArea) {
      handleStartBattle(gameState.currentArea.id);
    }
  };

  // Battle screen
  if (wildKanji && gameState.learner.partner) {
    const playerKanji = gameState.learner.partner;
    
    return (
      <div className="battle-screen">
        <h2 className="battle-title">Battle!</h2>
        
        <div className="battle-field">
          {/* Player's Kanji on the LEFT */}
          <div className="kanji-container player">
            <div className="player-indicator">Your Partner</div>
            <div className="kanji-sprite player-sprite">{playerKanji.character}</div>
            <div className="kanji-info">
              <h3>{playerKanji.name} (Lv. {playerKanji.level})</h3>
              <div className="hp-bar-container">
                <div 
                  className="hp-bar player-hp" 
                  style={{ width: `${(playerKanji.currentHp / playerKanji.maxHp) * 100}%` }}
                />
              </div>
              <p className="hp-text">{playerKanji.currentHp}/{playerKanji.maxHp} HP</p>
            </div>
          </div>

          {/* Enemy Kanji on the RIGHT */}
          <div className="kanji-container enemy">
            <div className="kanji-info">
              <h3>??? (Lv. {wildKanji.level})</h3>
              <div className="hp-bar-container">
                <div 
                  className="hp-bar" 
                  style={{ width: `${(wildKanji.currentHp / wildKanji.maxHp) * 100}%` }}
                />
              </div>
              <p className="hp-text">{wildKanji.currentHp}/{wildKanji.maxHp} HP</p>
            </div>
            <div className="kanji-sprite enemy-sprite">{wildKanji.character}</div>
          </div>
        </div>

        <div className="battle-log">
          {battleLog.slice(-5).map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>

        {showQuiz && capturedKanji && (
          <div className="quiz-modal">
            <div className="quiz-content">
              <h3>Identify the Kanji!</h3>
              <div className="quiz-kanji">{capturedKanji.character}</div>
              <p>What is the reading of this kanji?</p>
              <div className="quiz-options">
                {quizOptions.map((option, index) => (
                  <button
                    key={index}
                    className="quiz-option"
                    onClick={() => handleQuizAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {battleResult === 'ongoing' && isPlayerTurn && !showQuiz && (
          <div className="battle-actions">
            <div className="moves-grid">
              {playerKanji.moves.map((move, index) => (
                <button
                  key={move.id}
                  className="move-button"
                  onClick={() => handleAttack(index)}
                >
                  {move.name}
                  <span className="move-power">PWR: {move.power}</span>
                </button>
              ))}
            </div>
            <div className="action-buttons">
              <button 
                className="action-button capture"
                onClick={handleCapture}
                disabled={gameState.learner.inventory.ziScrolls <= 0}
              >
                📜 Capture ({gameState.learner.inventory.ziScrolls})
              </button>
              <button 
                className="action-button run"
                onClick={handleRunAway}
              >
                🏃 Run
              </button>
            </div>
          </div>
        )}

        {battleResult !== 'ongoing' && !showQuiz && (
          <div className="battle-result">
            <button className="new-battle-button" onClick={handleNewBattle}>
              New Battle
            </button>
            <button className="leave-button" onClick={handleRunAway}>
              Leave Area
            </button>
          </div>
        )}
      </div>
    );
  }

  // Area selection screen
  if (mode === 'explore') {
    return (
      <div className="area-explorer">
        <h2>Explore Japan</h2>
        <p className="mode-description">Select an area to explore and learn about different regions.</p>
        <div className="areas-grid">
          {gameState.areas.map(area => (
            <div
              key={area.id}
              className={`area-card ${area.isUnlocked ? 'unlocked' : 'locked'} ${gameState.currentArea?.id === area.id ? 'selected' : ''}`}
            >
              <h3>{area.name}</h3>
              <p className="region">{area.region}</p>
              <p className="description">{area.description}</p>
              <p className="level-req">
                Required Level: {area.requiredLevel}
              </p>
              {area.isUnlocked ? (
                <button
                  className="explore-button"
                  onClick={() => handleExploreArea(area.id)}
                >
                  {gameState.currentArea?.id === area.id ? 'Selected' : 'Select'}
                </button>
              ) : (
                <div className="locked-badge">🔒 Locked</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Battle mode
  return (
    <div className="area-explorer">
      <h2>Battle Arena</h2>
      <p className="mode-description">Start a battle in your selected area!</p>
      
      {!gameState.learner.partner && (
        <div className="no-partner-warning">
          <p>⚠️ You need a partner to battle!</p>
          <p>Select a Kanji from the Kanji tab first.</p>
        </div>
      )}

      {!gameState.currentArea && (
        <div className="no-area-warning">
          <p>⚠️ No area selected!</p>
          <p>Go to the Areas tab and select an area first.</p>
        </div>
      )}

      {gameState.currentArea && (
        <div className="current-area-info">
          <h3>Selected Area: {gameState.currentArea.name}</h3>
          <p className="area-description">{gameState.currentArea.description}</p>
        </div>
      )}

      <div className="battle-settings">
        <div className="level-selector">
          <label htmlFor="level-select">Wild Kanji Level:</label>
          <input
            id="level-select"
            type="range"
            min="1"
            max={gameState.learner.level}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
          />
          <span className="level-value">Level {selectedLevel}</span>
        </div>
      </div>

      <div className="battle-start-container">
        <button
          className="main-battle-button"
          onClick={() => gameState.currentArea && handleStartBattle(gameState.currentArea.id)}
          disabled={!gameState.learner.partner || !gameState.currentArea}
        >
          ⚔️ Start Battle
        </button>
      </div>
    </div>
  );
}
