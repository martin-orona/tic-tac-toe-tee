import { IAppState } from "../App";
import {
  ActionType,
  IAction,
  IBeginEditPlayerAction,
  ICell,
  ICellChosenAction,
  ICompleteEditPlayerAction,
  IEditGameSettingsCompleteAction,
  IGameResult,
  IGameSettings,
  IGameStartAction,
  WhichPlayer
} from "./shared/sharedInterfaces";
import { IActionHandlerDictionary } from "./shared/Utilities";

interface IBoardInfo {
  board: ICell[];
  gameSettings: IGameSettings;
}

interface ICellPosition {
  row: number;
  column: number;
}

export const GameActionHandlers: IActionHandlerDictionary = {
  sync: {
    // ===== game control =====
    [ActionType.StartGame]: startGame,
    [ActionType.ResetGame]: resetGame,
    [ActionType.GameCellChosen]: cellChosen,

    // ===== app control =====
    [ActionType.EditGameSettingsBegin]: editGameSettings_begin,
    [ActionType.EditGameSettingsCancelled]: editGameSettings_cancelled,
    [ActionType.EditGameSettingsComplete]: editGameSettings_complete,

    [ActionType.EditPlayerBegin]: editPlayer_begin,
    [ActionType.EditPlayerBeginComplete]: editPlayer_complete,
    [ActionType.EditPlayerCancelled]: editPlayer_cancelled
  }
};

// #region game actions

// #region ===== app control =====

// #region ===== game settings =====

function editGameSettings_begin(state: IAppState, action: IAction) {
  return {
    ...state,
    isSettingsBeingEdited: true
  };
}

function editGameSettings_cancelled(state: IAppState, action: IAction) {
  return {
    ...state,
    isSettingsBeingEdited: false
  };
}

function editGameSettings_complete(
  state: IAppState,
  action: IEditGameSettingsCompleteAction
) {
  return {
    ...state,
    gameSettings: { ...action.settings },
    isSettingsBeingEdited: false
  };
}

// #endregion ===== game settings =====

// #region ===== edit player =====

function editPlayer_begin(state: IAppState, action: IBeginEditPlayerAction) {
  return { ...state, playerBeingEdited: action.which };
}

function editPlayer_complete(
  state: IAppState,
  action: ICompleteEditPlayerAction
) {
  return {
    ...state,
    player1: action.which === WhichPlayer.One ? action.player : state.player1,
    player2: action.which === WhichPlayer.Two ? action.player : state.player2,
    playerBeingEdited: WhichPlayer.None
  };
}

function editPlayer_cancelled(state: IAppState, action: IAction) {
  return { ...state, playerBeingEdited: WhichPlayer.None };
}

// #endregion ===== edit player =====

// #region ===== game control =====

function startGame(state: IAppState, action: IGameStartAction) {
  return {
    ...state,

    activePlayer: action.firstPlayer,
    board: createBoard(
      state.gameSettings.boardWidth,
      state.gameSettings.boardHeight
    ),
    isPlaying: true,
    winner: { isWon: false }
  };
}

function resetGame(state: IAppState, action: IGameStartAction) {
  return {
    ...startGame(state, action),

    activePlayer: WhichPlayer.None,
    isPlaying: false,
    winner: { isWon: false }
  };
}

function cellChosen(state: IAppState, action: ICellChosenAction) {
  if (isCellAlreadyUsed(state, action.row, action.column)) {
    return state;
  }

  const newState = { ...state, board: [...state.board] };
  const cell = getCell(newState, action.row, action.column);

  if (!cell) {
    return state;
  }

  cell.player = state.activePlayer;

  const gameResult = isGameWon(
    newState as IBoardInfo,
    action.row,
    action.column,
    state.activePlayer
  );

  // return {
  //   ...newState,
  //   activePlayer: gameResult.isWon
  //     ? newState.activePlayer
  //     : getNextPLayer(newState.activePlayer),
  //   isPlaying: !gameResult.isWon,
  //   winner: gameResult.isWon ? gameResult : newState.winner
  // };

  if (gameResult.isWon) {
    newState.isPlaying = false;
    newState.winner = gameResult;
  } else {
    newState.activePlayer = getNextPLayer(state.activePlayer);
  }

  return newState;
}

// #endregion ===== game control =====

// #endregion ===== app control =====

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

  if (cells.length >= boardInfo.gameSettings.winningRowLength) {
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
  const location = getCellLocation(boardInfo, row, column);

  if (location === undefined) {
    return undefined;
  }

  return boardInfo.board[location];
}

function getCellLocation(boardInfo: IBoardInfo, row: number, column: number) {
  if (row < 0) {
    return undefined;
  }

  if (row >= boardInfo.gameSettings.boardHeight) {
    return undefined;
  }

  if (column < 0) {
    return undefined;
  }

  if (column >= boardInfo.gameSettings.boardWidth) {
    return undefined;
  }

  const index = row * boardInfo.gameSettings.boardWidth + column;
  if (index > boardInfo.board.length || index < 0) {
    return undefined;
  }

  return index;
}

const Board = { getCell };

// #endregion board actions

// #region player

function getNextPLayer(current: WhichPlayer): WhichPlayer {
  return current === WhichPlayer.One ? WhichPlayer.Two : WhichPlayer.One;
}

const Player = {
  getNextPLayer
};

// #endregion player

const GameLogic = {
  board: Board,
  player: Player
};
export default GameLogic;
