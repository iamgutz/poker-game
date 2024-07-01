import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AIPlayer, Card, Player } from '../bin/definitions';
import { GameContext, GameState } from './GameContext';
import { generateAIPlayers, generatePlayer } from './helpers';
import { handleSetBlinds, handleSetDealerPosition } from './playerPositions';
import usePrevious from '../hooks/usePrevious';

const LOCAL_STORAGE_KEY = 'pokerGameState';

interface GameProviderProps {
  children: ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedState = storedState ? JSON.parse(storedState) : {};

  const [communityCards, setCommunityCards] = useState<Card[]>(parsedState.communityCards || []);
  const [pot, setPot] = useState(parsedState.pot || 0);
  const [currentBet, setCurrentBet] = useState<number>(parsedState.currentBet || 0);
  const [minimumRaise, setMinimumRaise] = useState<number>(parsedState.minimumRaise || 0);
  const [aiPlayers, setAIPlayers] = useState<AIPlayer[]>(parsedState.aiPlayers || []);
  const [player, setPlayer] = useState<Player>(parsedState.player || {});
  const [aiPlayersNumber, setAIPlayersNumber] = useState<number>(parsedState.aiPlayersNumber || 1);
  const [gameStarted, setGameStarted] = useState<boolean>(parsedState.gameStarted || false);
  const [positionDealer, setDealerPosition] = useState<number>(parsedState.positionDealer || 0);
  const [positionBigBlind, setBigBlindPosition] = useState<number>(
    parsedState.positionBigBlind || 0,
  );
  const [positionSmallBlind, setSmallBlindPosition] = useState<number>(
    parsedState.positionSmallBlind || 0,
  );
  const [round, setRound] = useState<number>(parsedState.round || 0);
  const prevRound = usePrevious(round);
  const prevDealerPos = usePrevious(positionDealer);

  const setPlayerName = (name: string) => {
    setPlayer(prev => ({
      ...prev,
      name,
    }));
  };

  const setPlayerAvatar = (avatar: number) => {
    setPlayer(prev => ({
      ...prev,
      avatar,
    }));
  };

  const resetGame = () => {
    setCommunityCards([]);
    setPot(0);
    setCurrentBet(0);
    setMinimumRaise(0);
    setAIPlayers(generateAIPlayers(aiPlayersNumber));
    setPlayer(generatePlayer(player.name, player.avatar));
    setGameStarted(false);
    setDealerPosition(0);
    setBigBlindPosition(0);
    setSmallBlindPosition(0);
    setRound(0);
  };

  const state: GameState = useMemo(
    () => ({
      communityCards,
      pot,
      currentBet,
      minimumRaise,
      aiPlayers,
      aiPlayersNumber,
      gameStarted,
      positionDealer,
      positionBigBlind,
      positionSmallBlind,
      round,
      player,
    }),
    [
      communityCards,
      pot,
      currentBet,
      minimumRaise,
      aiPlayers,
      aiPlayersNumber,
      gameStarted,
      positionDealer,
      positionBigBlind,
      positionSmallBlind,
      round,
      player,
    ],
  );

  useEffect(() => {
    // store state changes to localStorage
    const serializedState = JSON.stringify({ ...state });
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  }, [state]);

  useEffect(() => {
    if (!player) {
      const initPlayer = generatePlayer();
      setPlayer(initPlayer);
    }
  }, [player]);

  useEffect(() => {
    // Handle setting AI players when number of players changes
    if (!gameStarted && aiPlayersNumber > 0) {
      const generatedPlayers = generateAIPlayers(aiPlayersNumber);
      setAIPlayers(generatedPlayers);
    }
  }, [aiPlayersNumber, gameStarted]);

  useEffect(() => {
    if (prevRound !== undefined && round > 0 && round !== prevRound) {
      handleSetDealerPosition(state, setDealerPosition);
    }
  }, [round, prevRound, state]);

  useEffect(() => {
    if (gameStarted && prevDealerPos !== undefined && prevDealerPos !== positionDealer) {
      // set the blinds when the dealer changes
      handleSetBlinds({
        state,
        setBigBlindPosition,
        setSmallBlindPosition,
        setPot,
        setCurrentBet,
        setAIPlayers,
        setPlayer,
      });
    }
  }, [
    gameStarted,
    positionDealer,
    prevDealerPos,
    state,
    setBigBlindPosition,
    setSmallBlindPosition,
  ]);

  const contextValue = {
    state,
    setCommunityCards,
    setPot,
    setCurrentBet,
    setMinimumRaise,
    setAIPlayers,
    setAIPlayersNumber,
    setGameStarted,
    setDealerPosition,
    setBigBlindPosition,
    setSmallBlindPosition,
    setRound,
    setPlayer,
    setPlayerName,
    setPlayerAvatar,
    resetGame,
  };

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
}
