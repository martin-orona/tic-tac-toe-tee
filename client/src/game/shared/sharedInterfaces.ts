// #region redux interfaces

export interface IAction {
  type: ActionType;
}

export interface IGameStartAction extends IAction {
  firstPlayer: WhichPlayer;
}

export interface IEditGameSettingsCompleteAction extends IAction {
  settings: IGameSettings;
}

export interface IBeginEditPlayerAction extends IAction {
  which: WhichPlayer;
}

export interface ICompleteEditPlayerAction extends IAction {
  which: WhichPlayer;
  player: IPlayer;
}

export interface ICellChosenAction extends IAction {
  row: number;
  column: number;
}

export interface IReceivedInitialServerResponseAction extends IAction {
  serverResponse: string;
}

// #endregion redux interfaces

// #region interfaces

export interface IGameSettings {
  boardWidth: number;
  boardHeight: number;
  winningRowLength: number;
}

// TODO: separate game state from UI state
export interface IGameState {
  isPlaying: boolean;
  activePlayer: WhichPlayer;
  player1?: IPlayer;
  player2?: IPlayer;
  playerBeingEdited: WhichPlayer;
  winner: IGameResult;
  board: ICell[];

  //  ===== ISettingsProps =====
  isSettingsBeingEdited: boolean;
  gameSettings: IGameSettings;
}

export interface ICell {
  row: number;
  column: number;
  player: WhichPlayer;
}

export interface IGameResult {
  isWon: boolean;
  player?: WhichPlayer;
  cells?: ICell[];
}

export interface IPlayer {
  name: string;
  avatarUrl: string;
}

// #endregion interfaces

// #region enums

export enum WhichPlayer {
  None = 0,
  One,
  Two
}

export enum ActionType {
  // ===== game control =====
  StartGame = "StartGame",
  ResetGame = "ResetGame",
  GameCellChosen = "GameCellChosen",

  // ===== app control =====
  EditGameSettingsBegin = "EditGameSettingsBegin",
  EditGameSettingsComplete = "EditGameSettingsComplete",
  EditGameSettingsCancelled = "EditGameSettingsCancelled",

  EditPlayerBegin = "EditPlayerBegin",
  EditPlayerBeginComplete = "EditPlayerBeginComplete",
  EditPlayerCancelled = "EditPlayerCancelled",

  // ===== server API =====
  InitialServerRequestBegin = "InitialServerRequestBegin",
  InitialServerRequestInProgress = "InitialServerRequestInProgress",
  InitialServerRequestComplete = "InitialServerRequestComplete",
  InitialServerRequestFailed = "InitialServerRequestFailed"
}

// #endregion enums

// #region event handlers

export type MouseEventHandler = (
  event?: React.MouseEvent<Element> | undefined
) => void;

// #endregion event handlers
