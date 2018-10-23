// #region widgets

export interface IWidgetProps {
  className?: string;
  title?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// #region widgets

// #region helper types

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type OmitClassAndChildren = Omit<any, "className" | "children">;

// #endregion helper types

// #region event handlers

export type MouseEventHandler = (
  event?: React.MouseEvent<Element> | undefined
) => void;

// #endregion event handlers
