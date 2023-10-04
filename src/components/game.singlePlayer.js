import React, { useMemo, useState } from 'react';
import Chess from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import Engine from '../utilities/stockfishEngine';
import WinnerModal from './winnerModal';
import GameLevel from './gameLevel';
import GameReset from './gameReset';

const SinglePlayerGame = () => {
  // Initializing the stockfish engine
  const engine = useMemo(() => new Engine(), []);
  // Initializing Chess.js
  const game = useMemo(() => new Chess(), []);

  const [gamePosition, setGamePosition] = useState(game.fen());
  const [gameHardnessLevel, setGameHardnessLevel] = useState(2); // default level set to 2;
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = useState(false);
  // Passing the current game positions to get the next game position from Stockfish
  function findBestMove() {
    try {
      engine.evaluatePosition(game.fen(), gameHardnessLevel);
      engine.onMessage(({ bestMove }) => {
        if (bestMove) {
          game.move({
            from: bestMove.substring(0, 2),
            to: bestMove.substring(2, 4),
            promotion: bestMove.substring(4, 5),
          });

          setGamePosition(game.fen());

          // Check for check
          if (game.in_check()) {
            console.log('check');
            toast.info('Check!');
          }

          if (game.in_checkmate()) {
            const winningPlayer = game.turn() === 'w' ? 'Black' : 'White';
            setWinner(winningPlayer);
            setOpen(true);
          } else if (game.in_draw()) {
            toast.info('It is a draw! Get them next time, chief!');
          } else if (game.game_over()) {
            toast.info('Game over!');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // On single player move
  function onDrop(sourceSquare, targetSquare, piece) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? 'q',
      });
      setGamePosition(game.fen());

      if (move === null) {
        toast.error('Invalid move, Please try again');
        return false;
      }
      if (game.in_check()) {
        toast.info('Check!');
      }

      if (game.in_checkmate()) {
        const winningPlayer = game.turn() === 'w' ? 'Black' : 'White';
        setWinner(winningPlayer);
        setOpen(true);
      } else if (game.in_draw()) {
        toast.info('It is a draw! Get them next time, chief!');
      } else if (game.game_over()) {
        toast.info('Game over!');
      }

      // Game Turn changes to stockfish
      findBestMove();

      return true;
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
  // Function to reset the game
  const resetGame = () => {
    game.reset();
    setGamePosition(game.fen());
  };

  // Function to undo the last move
  const undoMove = () => {
    game.undo();
    setGamePosition(game.fen());
  };

  return (
    <Box sx={{ width: '70vw', maxWidth: '70vh', marginLeft: '3rem' }}>
      <Box>
        <ToastContainer autoClose={800} theme='dark' />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GameLevel
          gameHardnessLevel={gameHardnessLevel}
          setGameHardnessLevel={setGameHardnessLevel}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Chessboard
          id='PlayVsStockfish'
          position={gamePosition}
          onPieceDrop={onDrop}
        />
        {winner && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
            run={true}
          />
        )}
      </Box>
      <WinnerModal winner={winner} open={open} handleClose={handleClose} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GameReset resetGame={resetGame} undoMove={undoMove} />
      </Box>
    </Box>
  );
};

export default SinglePlayerGame;
