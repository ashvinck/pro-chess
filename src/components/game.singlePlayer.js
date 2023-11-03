import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Chess from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useTheme } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import ListIcon from '@mui/icons-material/List';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import { v4 as uuidv4 } from 'uuid';
import Engine from '../utilities/stockfishEngine';
import { useSaveGameProgressMutation } from '../features/gameData/gameApiSlice';
import { selectGameProgress } from '../features/gameData/gameDataSlice';
import WinnerModal from './winnerModal';
import GameLevel from './gameLevel';
import GameReset from './gameReset';
import SavedGameList from './savedGameList';

// Styled IconButton
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const SinglePlayerGame = () => {
  // Mutation hook for saving game data to api (rtk query)
  const [saveGameProgress] = useSaveGameProgressMutation();

  const restoreFen = useSelector(selectGameProgress);

  // theme from mui
  const theme = useTheme();

  // Initializing the stockfish engine
  const engine = useMemo(() => new Engine(), []);
  // Initializing Chess.js
  const game = useMemo(() => new Chess(), []);

  const [gameId, setGameId] = useState(uuidv4());
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [gameHardnessLevel, setGameHardnessLevel] = useState(2); // default level set to 2;
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);

  const [activeSquare, setActiveSquare] = useState('');
  const BgImage = `${process.env.PUBLIC_URL}/Chesspieces/wood-pattern.png`;

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
    game.undo();
    setGamePosition(game.fen());
  };

  // Save the current game state
  const saveGameState = async () => {
    const gameData = {
      id: gameId,
      fen: game.fen(),
      winner: winner,
      timeStamp: Date.now(),
    };
    saveGameProgress(gameData)
      .unwrap()
      .then((response) => toast.success(response.message))
      .catch((err) => {
        toast.error('Error saving gameData');
        console.error('Error saving data', err);
      });
  };
  // Function to open the saved game list
  const handleOpenGameList = () => {
    setOpenList((prevState) => !prevState);
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

  // update gamePosition when Redux updates restoreFen
  useEffect(() => {
    if (restoreFen) {
      // console.log('Restored FEN:', restoreFen);
      game.load(restoreFen);
      setGamePosition(restoreFen);
      // console.log('Current FEN:', game.fen());
    }
  }, [restoreFen]);

  return (
    <Box>
      <ToastContainer autoClose={800} theme='dark' />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GameLevel
          gameHardnessLevel={gameHardnessLevel}
          setGameHardnessLevel={setGameHardnessLevel}
        />
      </Box>

      <Box
        sx={{
          width: '80vw',
          maxWidth: '70vh',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Chessboard
          id='PlayVsStockfish'
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
          onMouseOutSquare={(sq) => setActiveSquare('')}
        />
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing(2),
        }}
      >
        <Box sx={{ margin: theme.spacing(1) }}>
          <GameReset resetGame={resetGame} undoMove={undoMove} />
        </Box>
        <Box sx={{ margin: theme.spacing(1) }}>
          <Tooltip title='Save Game Progress'>
            <StyledIconButton variant='contained' onClick={saveGameState}>
              <SaveIcon />
            </StyledIconButton>
          </Tooltip>
        </Box>
        <Box sx={{ margin: theme.spacing(1) }}>
          <Tooltip title='Game List'>
            <StyledIconButton variant='contained' onClick={handleOpenGameList}>
              <ListIcon />
            </StyledIconButton>
          </Tooltip>
        </Box>
        {openList && <SavedGameList />}
      </Box>
    </Box>
  );
};

export default SinglePlayerGame;
