// #region interfaces

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

// #endregion enums

// #region event handlers

export type MouseEventHandler = (
  event?: React.MouseEvent<Element> | undefined
) => void;

// #endregion event handlers
