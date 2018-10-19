export interface IPlayer {
  name: string;
  avatarUrl: string;
}

export type MouseEventHandler = (
  event?: React.MouseEvent<Element> | undefined
) => void;

export enum WhichPlayer {
  None = 0,
  One,
  Two
}
