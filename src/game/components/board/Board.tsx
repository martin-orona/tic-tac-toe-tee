import * as React from "react";
import CommandBar from "./CommandBar";

export interface IBoardProps {
  isPlaying: boolean;
  isReadyToBegin: boolean;
  onPlay: () => void;
  onReset: () => void;
}

const Board = (props: IBoardProps) => {
  return (
    <div className="board">
      <p>board</p>
      <CommandBar {...props} />
    </div>
  );
};

export default Board;
