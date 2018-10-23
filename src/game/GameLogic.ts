import Game from "./Game";
import {
  ICell,
  IGameResult,
  IPlayer,
  WhichPlayer
} from "./shared/sharedInterfaces";
import { Random } from "./shared/Utilities";

interface IBoardInfo {
  board: ICell[];
  boardWidth: number;
  boardHeight: number;
  winningRowLength: number;
}

interface ICellPosition {
  row: number;
  column: number;
}

// #region game actions

function startGame(game: Game) {
  game.setState({
    activePlayer: Random.getInt_FromInclusiveRange(
      WhichPlayer.One,
      WhichPlayer.Two
    ),
    board: createBoard(game.state.boardWidth, game.state.boardHeight),
    isPlaying: true,
    winner: { isWon: false }
  });
}

function resetGame(game: Game) {
  game.setState({
    activePlayer: WhichPlayer.None,
    board: createBoard(game.state.boardWidth, game.state.boardHeight),
    isPlaying: false,
    winner: { isWon: false }
  });
}

function cellChosen(game: Game, row: number, column: number) {
  if (isCellAlreadyUsed(game.state, row, column)) {
    return;
  }

  let gameResult: IGameResult;

  game.setState(
    prev => {
      const board = copyBoard(prev.board);
      (getCell(prev, row, column) as ICell).player = prev.activePlayer;
      gameResult = isGameWon(
        { ...prev, board } as IBoardInfo,
        row,
        column,
        prev.activePlayer
      );
      return {
        activePlayer: getNextPLayer(prev.activePlayer),
        board
      };
    },
    () => {
      if (gameResult.isWon) {
        game.setState({
          activePlayer: gameResult.player as WhichPlayer,
          isPlaying: false,
          winner: gameResult
        });
      }
    }
  );
}

// #region helpers

function isCellAlreadyUsed(
  boardInfo: IBoardInfo,
  row: number,
  column: number
): boolean {
  const cell = getCell(boardInfo, row, column) as ICell;
  return cell.player !== WhichPlayer.None;
}

function isGameWon(
  boardInfo: IBoardInfo,
  row: number,
  column: number,
  player: WhichPlayer
): IGameResult {
  const anchorCell = getCell(boardInfo, row, column);
  if (!anchorCell || anchorCell.player === WhichPlayer.None) {
    return { isWon: false };
  }

  // check horizontal
  let result: IGameResult = isPartOfWinningRow(
    boardInfo,
    anchorCell,
    (p: ICellPosition) => {
      return { row: p.row, column: p.column + 1 };
    },
    (p: ICellPosition) => {
      return { row: p.row, column: p.column - 1 };
    }
  );

  // check vertical
  if (!result.isWon) {
    result = isPartOfWinningRow(
      boardInfo,
      anchorCell,
      (p: ICellPosition) => {
        return { row: p.row + 1, column: p.column };
      },
      (p: ICellPosition) => {
        return { row: p.row - 1, column: p.column };
      }
    );
  }

  // check diagonal downward
  if (!result.isWon) {
    result = isPartOfWinningRow(
      boardInfo,
      anchorCell,
      (p: ICellPosition) => {
        return { row: p.row + 1, column: p.column + 1 };
      },
      (p: ICellPosition) => {
        return { row: p.row - 1, column: p.column - 1 };
      }
    );
  }

  // check diagonal upward
  if (!result.isWon) {
    result = isPartOfWinningRow(
      boardInfo,
      anchorCell,
      (p: ICellPosition) => {
        return { row: p.row - 1, column: p.column + 1 };
      },
      (p: ICellPosition) => {
        return { row: p.row + 1, column: p.column - 1 };
      }
    );
  }

  return result;
}

function isPartOfWinningRow(
  boardInfo: IBoardInfo,
  anchorCell: ICell,
  getNextCellPosition: (current: ICellPosition) => ICellPosition,
  getPreviousCellPosition: (current: ICellPosition) => ICellPosition
): IGameResult {
  const before = getMatches(boardInfo, anchorCell, getPreviousCellPosition);
  const after = getMatches(boardInfo, anchorCell, getNextCellPosition);
  const cells = before.concat(anchorCell, after);

  if (cells.length >= boardInfo.winningRowLength) {
    return { isWon: true, cells };
  } else {
    return { isWon: false };
  }

  function getMatches(
    board: IBoardInfo,
    anchor: ICell,
    getNextPosition: (current: ICellPosition) => ICellPosition
  ) {
    const found: ICell[] = [];
    let position: ICellPosition;
    let cell: ICell | undefined = anchor;
    const player = anchor.player;
    let isMatch = true;

    do {
      position = getNextPosition(cell as ICell);
      cell = getCell(boardInfo, position.row, position.column);

      if (!cell || cell.player !== player) {
        isMatch = false;
      } else {
        found.push(cell);
      }
    } while (isMatch);

    return found;
  }
}

// #endregion helpers

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
  if (row < 0) {
    return undefined;
  }

  if (row >= boardInfo.boardHeight) {
    return undefined;
  }

  if (column < 0) {
    return undefined;
  }

  if (column >= boardInfo.boardWidth) {
    return undefined;
  }

  const index = row * boardInfo.boardWidth + column;
  if (index > boardInfo.board.length || index < 0) {
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
