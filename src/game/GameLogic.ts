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

  function check(
    getNextRow: (current: number) => number,
    getNextColumn: (current: number) => number
  ) {
    return isAnchorOfWinningRow(
      boardInfo,
      anchorCell as ICell,
      getNextRow,
      getNextColumn
    );
  }

  // check horizontal - start
  let result: IGameResult = check((r: number) => r, (c: number) => c + 1);
  // check horizontal - end
  if (!result.isWon) {
    result = check((r: number) => r, (c: number) => c - 1);
  }

  // check vertical - start
  if (!result.isWon) {
    result = check((r: number) => r + 1, (c: number) => c);
  }
  // check vertical - end
  if (!result.isWon) {
    result = check((r: number) => r - 1, (c: number) => c);
  }

  // check diagonal downward - start
  if (!result.isWon) {
    result = check((r: number) => r + 1, (c: number) => c + 1);
  }
  // check diagonal downward - end
  if (!result.isWon) {
    result = check((r: number) => r - 1, (c: number) => c - 1);
  }

  // check diagonal upward - start
  if (!result.isWon) {
    result = check((r: number) => r - 1, (c: number) => c + 1);
  }
  // check diagonal upward - end
  if (!result.isWon) {
    result = check((r: number) => r + 1, (c: number) => c - 1);
  }

  return result;
}

function isAnchorOfWinningRow(
  boardInfo: IBoardInfo,
  anchorCell: ICell,
  getNextRow: (current: number) => number,
  getNextColumn: (current: number) => number
): IGameResult {
  const required = boardInfo.winningRowLength;
  const player = anchorCell.player;

  const cells = [anchorCell];
  let matched = 1;
  let cell: ICell = anchorCell;
  let got: ICell | undefined;

  for (let i = 0; i < required; i++) {
    got = getCell(boardInfo, getNextRow(cell.row), getNextColumn(cell.column));
    if (!got || got.player !== player) {
      break;
    }

    cell = got as ICell;
    cells.push(cell);
    matched++;

    if (matched >= required) {
      return { isWon: true, cells };
    }
  }

  return { isWon: false };
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
