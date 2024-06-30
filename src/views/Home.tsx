import useGameContext from '../context/GameContext';

export default function HomeView() {
  const { setAIPlayersNumber, state, setGameStarted, setRound, setPlayerName } = useGameContext();
  const handleOnStart = () => {
    setGameStarted(true);
    setRound(1);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-xl m-auto">
      <div className="flex flex-col justify-center gap-2 w-full">
        <h3>Enter your name</h3>
        <input
          type="text"
          onChange={({ target: { value } }) => setPlayerName(value)}
          value={state.player.name}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        <h3>Enter number of CPU Players</h3>
        <input
          type="number"
          onChange={({ target: { value } }) => setAIPlayersNumber(Number(value))}
          value={state.aiPlayersNumber}
          max={3}
          min={1}
        />
      </div>

      <button onClick={handleOnStart}>Start</button>
    </div>
  );
}
