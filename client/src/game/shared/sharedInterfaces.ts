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
  which: WhichPlayer;
  row: number;
  column: number;
}

export interface IReceivedInitialServerResponseAction extends IAction {
  serverResponse: string;
}

// #endregion redux interfaces

// #region interfaces

export interface IAppState {
  game: IGameState;
  server: IServerApiState;
}

// #region game state

export interface IGameState extends IBoardState {
  playerBeingEdited: WhichPlayer;
  isSettingsBeingEdited: boolean;
}

export interface IBoardState {
  matchState?: IMatchState;
  settings: IGameConfig;
}

export interface IGameConfig {
  players: IPlayers;
  gameSettings: IGameSettings;
}

export interface IGameSettings {
  boardWidth: number;
  boardHeight: number;
  winningRowLength: number;
}

export interface IPlayers {
  player1?: IPlayer;
  player2?: IPlayer;
}

// tslint:disable-next-line:no-empty-interface
export interface IMatchConfig extends IGameConfig {}

export interface IMatchState {
  activePlayer: WhichPlayer;
  board: ICell[];
  isPlaying: boolean;
  matchConfig: IMatchConfig;
  winner: IGameResult;
}

// #endregion game state

// #region server integration state

export interface IServerApiState {
  initialServerCallCount: number;
  initialServerResponseCount: number;
  isInitialServerCallMade: boolean;
  initialServerRequestStatus: string;
  serverResponse: string;
}

// #region server integration state

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
