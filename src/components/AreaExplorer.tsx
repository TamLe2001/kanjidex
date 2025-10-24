import { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { getKanjiById } from '../data/kanjiCharacters';
import { getRandomWildKanji, calculateDamage, isFainted, attemptCapture, gainExp } from '../utils/gameLogic';
import type { KanjiCharacter } from '../types';
import './AreaExplorer.css';

export default function AreaExplorer() {
  const { gameState, selectArea, addToCaughtKanji, addToTeam, updateLearner, gainLearnerExp, updateTeamKanji } = useGame();
  const [wildKanji, setWildKanji] = useState<KanjiCharacter | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleResult, setBattleResult] = useState<'ongoing' | 'won' | 'lost' | 'captured'>('ongoing');

  const handleExploreArea = (areaId: string) => {
    const area = gameState.areas.find(a => a.id === areaId);
    if (!area || !area.isUnlocked) return;

    selectArea(area);

    // Get random wild Kanji
    const wildKanjiIds = area.wildKanji.map(id => getKanjiById(id)).filter(k => k !== undefined) as KanjiCharacter[];
    const wild = getRandomWildKanji(wildKanjiIds, gameState.learner.level);
    
    setWildKanji(wild);
    setBattleLog([`A wild ${wild.name} appeared!`]);
    setIsPlayerTurn(true);
    setBattleResult('ongoing');
  };

  const handleAttack = (moveIndex: number) => {
    if (!wildKanji || !isPlayerTurn || gameState.learner.team.length === 0) return;

    const playerKanji = gameState.learner.team[0];
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
      updateTeamKanji(0, updatedPlayerKanji);
      
      updateLearner({
        currency: gameState.learner.currency + currencyGained
      });
      
      gainLearnerExp(Math.floor(updatedWild.level * 5));
      
      setBattleLog([
        ...newLog,
        `Wild ${updatedWild.name} fainted!`,
        `${playerKanji.name} gained ${expGained} EXP!`,
        `You earned ${currencyGained} currency!`
      ]);
      setBattleResult('won');
      return;
    }

    // Enemy's turn
    setIsPlayerTurn(false);
    setTimeout(() => {
      enemyAttack(updatedWild, newLog);
    }, 1000);
  };

  const enemyAttack = (currentWild: KanjiCharacter, currentLog: string[]) => {
    const playerKanji = gameState.learner.team[0];
    const enemyMove = currentWild.moves[Math.floor(Math.random() * currentWild.moves.length)];
    
    const damage = calculateDamage(currentWild, playerKanji, enemyMove);
    const updatedPlayer = { 
      ...playerKanji, 
      currentHp: Math.max(0, playerKanji.currentHp - damage) 
    };
    
    updateTeamKanji(0, updatedPlayer);
    
    const newLog = [...currentLog, `${currentWild.name} used ${enemyMove.name}! Dealt ${damage} damage.`];
    setBattleLog(newLog);

    if (isFainted(updatedPlayer)) {
      setBattleLog([...newLog, `${playerKanji.name} fainted! You lost the battle.`]);
      setBattleResult('lost');
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
      addToCaughtKanji(caughtKanji);
      
      if (gameState.learner.team.length < 6) {
        addToTeam(caughtKanji);
      }
      
      setBattleLog([
        ...battleLog,
        `You used a ZiScroll!`,
        `Success! ${wildKanji.name} was captured!`
      ]);
      setBattleResult('captured');
    } else {
      setBattleLog([
        ...battleLog,
        `You used a ZiScroll!`,
        `${wildKanji.name} broke free!`
      ]);
      
      // Enemy's turn after failed capture
      setIsPlayerTurn(false);
      setTimeout(() => {
        enemyAttack(wildKanji, [...battleLog, `You used a ZiScroll!`, `${wildKanji.name} broke free!`]);
      }, 1000);
    }
  };

  const handleRunAway = () => {
    setWildKanji(null);
    setBattleLog([]);
    setBattleResult('ongoing');
  };

  const handleNewBattle = () => {
    if (gameState.currentArea) {
      handleExploreArea(gameState.currentArea.id);
    }
  };

  if (wildKanji && gameState.learner.team.length > 0) {
    const playerKanji = gameState.learner.team[0];
    
    return (
      <div className="battle-screen">
        <h2 className="battle-title">Battle!</h2>
        
        <div className="battle-field">
          <div className="kanji-container enemy">
            <div className="kanji-info">
              <h3>{wildKanji.name} (Lv. {wildKanji.level})</h3>
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

          <div className="kanji-container player">
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
        </div>

        <div className="battle-log">
          {battleLog.slice(-5).map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>

        {battleResult === 'ongoing' && isPlayerTurn && (
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

        {battleResult !== 'ongoing' && (
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

  return (
    <div className="area-explorer">
      <h2>Explore Japan</h2>
      <div className="areas-grid">
        {gameState.areas.map(area => (
          <div
            key={area.id}
            className={`area-card ${area.isUnlocked ? 'unlocked' : 'locked'}`}
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
                disabled={gameState.learner.team.length === 0}
              >
                Explore
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
