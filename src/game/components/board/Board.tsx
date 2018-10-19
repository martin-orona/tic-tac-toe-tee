import * as React from "react";
import CommandBar from "./CommandBar";

import "./Board.css";

const CellSpaceBetween = 1;
const CellLength = 4;
const CellLengthUnit = "em";
const CellHeight = `${CellLength}${CellLengthUnit}`;
const CellWidth = `${CellLength}${CellLengthUnit}`;
const CellMargin = `${CellSpaceBetween / 2}${CellLengthUnit}`;

export interface IBoardProps {
  isPlaying: boolean;
  isReadyToBegin: boolean;
  boardWidth: number;
  boardHeight: number;
  onPlay: () => void;
  onReset: () => void;
}

const Board = (props: IBoardProps) => {
  const BoardLength = `${CellLength * props.boardWidth +
    CellSpaceBetween * props.boardWidth}${CellLengthUnit}`;

  return (
    <div className="board-container">
      <div
        className="board"
        style={{
          height: BoardLength,
          padding: CellMargin,
          width: BoardLength
        }}
      >
        {Array.from(Array(props.boardWidth).keys()).map(
          (row: number, rowIndex: number) => {
            return Array.from(Array(props.boardHeight).keys()).map(
              (column: number, columnIndex: number) => {
                return (
                  <div
                    className="cell"
                    key={`${row}-${column}`}
                    style={{
                      height: CellHeight,
                      margin: CellMargin,
                      width: CellWidth
                    }}
                  >
                    r:
                    {row} c:
                    {column}
                  </div>
                );
              }
            );
          }
        )}
      </div>

      <CommandBar {...props} />
    </div>
  );
};

export default Board;
