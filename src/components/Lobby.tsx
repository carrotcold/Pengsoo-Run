import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { createGame, resetGame, selectGame, startGame } from '~/store/gameSlice';
import { GameProgress } from '~/types/game.type';

import ModeSelection from './ModeSelection';
import WaitingPlayer from './WaitingPlayer';

function Lobby() {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(resetGame());
  }, []);

  useEffect(() => {
    if (game.progress === GameProgress.PLAYING) {
      history.push('/game');
    }
  }, [game]);

  const selectMode = (selected: string) => {
    const selectedMode = selected;
    dispatch(createGame(selectedMode));
  };

  return (
    <Layout>
      {game.mode ? (
        <WaitingPlayer
          gameId={game.id}
          mode={game.mode}
          playerList={game.playerList}
          startGame={() => dispatch(startGame(game.id))}
        />
      ) : (
        <ModeSelection handleClick={selectMode} />
      )}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h1 {
    font-size: 3rem;
    margin: 10px 0;
  }
`;

export default Lobby;
