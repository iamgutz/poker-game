import useGameContext from '../context/GameContext';
import PokerTableSVG from '../assets/poker-table.svg';
import Player from '../components/Player';

export default function PokerView() {
  const { resetGame, state } = useGameContext();

  const handleOnEndGame = () => {
    resetGame();
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between">
        <h1>Poker</h1>
        <button onClick={handleOnEndGame}>End game</button>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 flex-1">
        <div className="flex flex-col w-full max-w-2xl">
          <div className="flex gap-4 sm:gap-8 justify-center">
            <div className="flex justify-center w-20 sm:w-28">
              <Player data={state.aiPlayers[1]} />
            </div>
            <div className="flex justify-center w-20 sm:w-28">
              <Player data={state.aiPlayers[2]} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex justify-center w-20 sm:w-28">
              <Player data={state.aiPlayers[0]} />
            </div>
            <div>
              <PokerTableSVG className="w-full h-auto" />
            </div>
            <div className="flex justify-center w-20 sm:w-28">
              <Player data={state.aiPlayers[3]} />
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <div className="flex justify-center w-20 sm:w-28">
              <Player data={state.player} />
            </div>
            <div className="flex justify-center w-20 sm:w-28">
              <Player data={state.aiPlayers[4]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
