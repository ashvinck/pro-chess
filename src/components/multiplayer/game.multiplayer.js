import React, { useEffect, useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { ToastContainer, toast } from 'react-toastify';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Confetti from 'react-confetti';
import WinnerModal from '../winnerModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import {
  mountAfterPlayerLeftEvent,
  mountCloseRoomEvent,
  mountOnFlashMessageReceived,
  mountMovePieces,
  mountOnOpponentMovedPiece,
  unMountAfterPlayerLeftEvent,
  unMountOnFlashMessageReceived,
  unMountOnOpponentMovedPiece,
} from '../../utilities/socket.io';
import {
  logoutSocket,
  selectRoomId,
  selectSocket,
} from '../../features/multiplayer/socketSlice';
import Messages from './game.messages';
import { useBlocker, useNavigate } from 'react-router-dom';
import QuitGamePrompt from '../quitGamePrompt';

/////// Custom Styles \\\\\\\\\
const Container = React.memo(
  styled(Box)(() => ({
    minheight: '100vh',
    height: '100%',
  }))
);

const ChessBoardWrapper = React.memo(
  styled(Box)(({ theme }) => ({
    width: '80vw',
    maxWidth: '70vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.between('md', 'lg')]: {
      padding: '20px',
    },
  }))
);

//////// REACT COMPONENT  \\\\\\\\\\\\
const MultiplayerGame = ({ boardOrientation }) => {
  // Initializing Chess.js
  const game = useMemo(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [activeSquare, setActiveSquare] = useState('');
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = useState(false);
  //// To show the player left dialogue
  const [playerLeft, setPlayerLeft] = useState(false);
  const [lastToast, setLastToast] = useState('');

  const user = useSelector(selectUser);
  const roomId = useSelector(selectRoomId);
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BgImage = `${process.env.PUBLIC_URL}/Chesspieces/wood-pattern.png`;

  // Block navigating elsewhere when data has been entered into the input
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (socket) {
      mountOnOpponentMovedPiece(socket, (data) => {
        makeAMove(data);
      });

      mountOnFlashMessageReceived(socket, (data) => {
        toast(` 📩 ${data}`, {
          autoClose: 10000,
          pauseOnHover: true,
          theme: 'light',
        });
      });

      console.log('This is inside useEffects');

      mountAfterPlayerLeftEvent(socket, (data) => {
        // dispatch(logoutSocket());
        console.log('After Player Left Event ');
        setPlayerLeft(true);
        navigate('/play');
      });

      return () => {
        unMountOnOpponentMovedPiece(socket);
        unMountOnFlashMessageReceived(socket);
        unMountAfterPlayerLeftEvent(socket);
      };
    }

    if (socket === null) {
      navigate('/play');
    }
  }, [socket]);

  // Function to show controlled toast notifications
  const showToast = (type, message) => {
    if (lastToast !== type) {
      toast.info(message);
      setLastToast(type); // Update the last toast type
    }
  };

  const checkGameStatus = () => {
    if (game.in_checkmate()) {
      const winningPlayer = game.turn() === 'w' ? 'Black' : 'White';
      setWinner(winningPlayer);
      setOpen(true);
      showToast('checkmate', `${winningPlayer} wins by checkmate!`);
      return; // Exit after checkmate
    }

    if (game.in_check()) {
      showToast('check', 'Check!');
    }

    if (game.in_draw()) {
      showToast('draw', 'It is a draw! Get them next time, chief!');
      return;
    }

    if (game.in_stalemate()) {
      showToast('stalemate', 'It is a stalemate! Peace!');
      return;
    }

    if (game.game_over()) {
      showToast('gameOver', 'Game over!');
      return;
    }
  };

  const makeAMove = (move) => {
    try {
      const gameMovement = game.move({
        from: move.from,
        to: move.to,
      });
      if (!gameMovement) {
        return; // Invalid move
      }
      setGamePosition(game.fen());
      // Check for game status only if the game is still ongoing
      if (!game.game_over()) {
        checkGameStatus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Game Play
  function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const movement = {
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? 'q',
      };

      const gameMovement = game.move(movement);
      if (!gameMovement) {
        toast.error('Invalid move, Please try again');
        return; // Exit if the move is invalid
      }
      const movementData = Object.assign(movement, {
        roomId: roomId,
        user: user,
      });
      // Game turn to socket.io
      mountMovePieces(socket, movementData);
      setGamePosition(game.fen());
      checkGameStatus();
    } catch (error) {
      console.error(error);
    }
  }

  // Handle Dialog (when game finishes)
  const handleClose = () => {
    setOpen(false);
    setWinner(null);
    game.reset(); // Reset the game
    setGamePosition(game.fen());
  };

  // 3d Pieces of the chess board
  const threeDPieces = useMemo(() => {
    const pieces = [
      { piece: 'wP', pieceHeight: 1 },
      { piece: 'wN', pieceHeight: 1.2 },
      { piece: 'wB', pieceHeight: 1.2 },
      { piece: 'wR', pieceHeight: 1.2 },
      { piece: 'wQ', pieceHeight: 1.5 },
      { piece: 'wK', pieceHeight: 1.6 },
      { piece: 'bP', pieceHeight: 1 },
      { piece: 'bN', pieceHeight: 1.2 },
      { piece: 'bB', pieceHeight: 1.2 },
      { piece: 'bR', pieceHeight: 1.2 },
      { piece: 'bQ', pieceHeight: 1.5 },
      { piece: 'bK', pieceHeight: 1.6 },
    ];

    const pieceComponents = {};
    pieces.forEach(({ piece, pieceHeight }) => {
      pieceComponents[piece] = ({ squareWidth, square }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            position: 'relative',
            pointerEvents: 'none',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Chesspieces/${piece}.webp`}
            alt={`${piece}`}
            width={squareWidth}
            height={pieceHeight * squareWidth}
            style={{
              position: 'absolute',
              bottom: `${0.2 * squareWidth}px`,
              objectFit: piece[1] === 'K' ? 'contain' : 'cover',
            }}
          />
        </div>
      );
    });
    return pieceComponents;
  }, []);

  return (
    <Container>
      <ToastContainer autoClose={800} theme='dark' />
      {blocker.state === 'blocked' ? (
        <QuitGamePrompt
          blocker={blocker}
          socket={socket}
          playerLeft={playerLeft}
        />
      ) : (
        <>
          <Box></Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '90vh',
            }}
          >
            <ChessBoardWrapper>
              <Chessboard
                id='PlayVsFriend'
                position={gamePosition}
                onPieceDrop={onDrop}
                customBoardStyle={{
                  transform: 'rotateX(32.5deg)',
                  transformOrigin: 'center',
                  border: '16px solid #b8836f',
                  borderStyle: 'outset',
                  borderRightColor: ' #b27c67',
                  borderRadius: '4px',
                  boxShadow: 'rgba(0, 0, 0, 0.5) 2px 24px 24px 8px',
                  borderRightWidth: '2px',
                  borderLeftWidth: '2px',
                  borderTopWidth: '0px',
                  borderBottomWidth: '16px',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  padding: '2px',
                  width: '101%',
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#e0c094',
                  backgroundImage: `url(${BgImage})`,
                  backgroundSize: 'cover',
                }}
                customPieces={threeDPieces}
                customLightSquareStyle={{
                  backgroundColor: '#e0c094',
                  backgroundImage: `url(${BgImage})`,
                  backgroundSize: 'cover',
                }}
                customDarkSquareStyle={{
                  backgroundColor: '#865745',
                  backgroundImage: `url(${BgImage})`,
                  backgroundSize: 'cover',
                }}
                animationDuration={500}
                customSquareStyles={{
                  [activeSquare]: {
                    boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)',
                  },
                }}
                onMouseOverSquare={(sq) => setActiveSquare(sq)}
                onMouseOutSquare={() => setActiveSquare('')}
                boardOrientation={boardOrientation}
              />
            </ChessBoardWrapper>
          </Box>
          {winner && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
              recycle={false}
              run={true}
            />
          )}

          <WinnerModal winner={winner} open={open} handleClose={handleClose} />
          <Messages socket={socket} roomId={roomId} />
        </>
      )}
    </Container>
  );
};

export default MultiplayerGame;
