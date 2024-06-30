import GameProvider from './context/GameProvider';
import GameView from './views/Game';

function App() {
  return (
    <GameProvider>
      <GameView />
    </GameProvider>
  );
}

export default App;
