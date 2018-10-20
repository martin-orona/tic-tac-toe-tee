import { IPlayer, WhichPlayer } from "./common/sharedInterfaces";
import { Random } from "./common/Utilities";
import Game from "./Game";

export interface ICell {
  row: number;
  column: number;
  player: WhichPlayer;
}

interface IBoardInfo {
  board: ICell[];
  boardWidth: number;
  boardHeight: number;
}

// #region game actions

function startGame(game: Game) {
  game.setState({
    activePlayer: Random.getInt_FromInclusiveRange(
      WhichPlayer.One,
      WhichPlayer.Two
    ),
    board: createBoard(game.state.boardWidth, game.state.boardHeight),
    isPlaying: true
  });
}

function resetGame(game: Game) {
  game.setState({
    activePlayer: WhichPlayer.None,
    board: createBoard(game.state.boardWidth, game.state.boardHeight),
    isPlaying: false
  });
}

function cellChosen(game: Game, row: number, column: number) {
  game.setState(prev => {
    const board = copyBoard(prev.board);
    (getCell(prev, row, column) as ICell).player = prev.activePlayer;
    return {
      activePlayer: getNextPLayer(prev.activePlayer),
      board
    };
  });
}

// #endregion game actions

// #region board actions

function copyBoard(board: ICell[]): ICell[] {
  // create new copy of the board state
  // NOTE: This can become a performance problem for large boards
  const result: ICell[] = [];
  let i = board.length;
  while (i--) {
    result[i] = board[i];
  }
  return result;
}

function createBoard(rows: number, columns: number): ICell[] {
  const board: ICell[] = new Array(rows * columns);

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      board[row * rows + column] = {
        column,
        player: WhichPlayer.None,
        row
      } as ICell;
    }
  }

  return board;
}

function getCell(
  boardInfo: IBoardInfo,
  row: number,
  column: number
): ICell | undefined {
  const index = row * boardInfo.boardWidth + column;
  if (index > boardInfo.board.length) {
    return undefined;
  }
  return boardInfo.board[index];
}

const Board = { getCell };
// #endregion board actions

// #region player

function getNextPLayer(current: WhichPlayer): WhichPlayer {
  return current === WhichPlayer.One ? WhichPlayer.Two : WhichPlayer.One;
}

// #region player editor

function editPlayer_onBegin(game: Game, which: WhichPlayer) {
  game.setState({ playerBeingEdited: which });
}

function editPlayer_onFinished(game: Game, player: IPlayer) {
  game.setState(prev => {
    return {
      player1:
        prev.playerBeingEdited === WhichPlayer.One ? player : prev.player1,
      player2:
        prev.playerBeingEdited === WhichPlayer.Two ? player : prev.player2,
      playerBeingEdited: WhichPlayer.None
    };
  });
}

function editPlayer_onCancelled(game: Game) {
  game.setState({
    playerBeingEdited: WhichPlayer.None
  });
}

// #endregion player editor

const Player = {
  onBeginEdit: editPlayer_onBegin,
  onEditCancelled: editPlayer_onCancelled,
  onEditFinished: editPlayer_onFinished
};

// #endregion player

const GameLogic = {
  board: Board,
  cellChosen,
  player: Player,
  reset: resetGame,
  start: startGame
};
export default GameLogic;
