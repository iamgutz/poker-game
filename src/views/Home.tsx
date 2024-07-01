import { useState } from 'react';
import Avatar from '../components/Avatar';
import useGameContext from '../context/GameContext';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import Input from '../components/Input';
import Button from '../components/Button';
import IconButton from '../components/IconButton';

export default function HomeView() {
  const { setAIPlayersNumber, state, setGameStarted, setRound, setPlayerName, setPlayerAvatar } =
    useGameContext();
  const [avatar, setAvatar] = useState(state.player.avatar || 1);
  const [name, setName] = useState(state.player.name || '');
  const handleChangeAvatar = (nextIndex: number) => {
    if (nextIndex > 16) {
      setAvatar(1);
    } else if (nextIndex < 1) {
      setAvatar(16);
    } else {
      setAvatar(nextIndex);
    }
  };
  const handleOnStart = () => {
    setGameStarted(true);
    setRound(1);
    setPlayerAvatar(avatar);
    setPlayerName(name);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-xl m-auto">
      <div className="flex flex-col justify-center gap-2 w-full">
        <h3>Choose your avatar</h3>
        <div className="flex items-center gap-5">
          <IconButton
            variant="warning"
            onClick={() => handleChangeAvatar(avatar - 1)}
          >
            <FaCaretLeft className="mr-1" />
          </IconButton>
          <div className="h-60 w-full min-w-60 flex justify-center">
            <Avatar
              variant={avatar}
              className="h-full"
            />
          </div>
          <IconButton
            variant="warning"
            onClick={() => handleChangeAvatar(avatar + 1)}
          >
            <FaCaretRight className="ml-1" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        <h3>Player</h3>
        <Input
          type="text"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
          placeholder="Enter your name"
        />
      </div>
      <div className="flex flex-col justify-center gap-2 w-full">
        <h3>Number of CPU Players</h3>
        <Input
          type="number"
          onChange={({ target: { value } }) => setAIPlayersNumber(Number(value))}
          value={state.aiPlayersNumber}
          max={5}
          min={1}
        />
      </div>

      <Button
        variant="success"
        onClick={handleOnStart}
        disabled={!name}
      >
        PLAY
      </Button>
    </div>
  );
}
