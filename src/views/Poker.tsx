import useGameContext from '../context/GameContext';

export default function PokerView() {
  const { resetGame, state } = useGameContext();
  const players = [...state.aiPlayers, state.player];

  const handleOnEndGame = () => {
    resetGame();
  };
  return (
    <div>
      <h1>Poker</h1>
      <button onClick={handleOnEndGame}>End game</button>
    </div>
  );
}
