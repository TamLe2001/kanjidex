import { GameProvider } from './context/GameContext'
import { useGame } from './hooks/useGame'
import StarterSelection from './components/StarterSelection'
import GameScreen from './components/GameScreen'
import './App.css'

function GameContent() {
  const { gameState } = useGame();

  return (
    <>
      {!gameState.hasStarted ? (
        <StarterSelection />
      ) : (
        <GameScreen />
      )}
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App
