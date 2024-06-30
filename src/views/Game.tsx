import useGameContext from '../context/GameContext';
import HomeView from './Home';
import PokerView from './Poker';

export default function GameView() {
  const { state } = useGameContext();
  return <>{state.gameStarted ? <PokerView /> : <HomeView />}</>;
}
