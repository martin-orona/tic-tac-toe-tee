import * as React from "react";
import GameLogic, { ICell } from "src/game/GameLogic";
import { IPlayer, WhichPlayer } from "../../common/sharedInterfaces";
import * as PlayerUtilities from "../player/PlayerUtilities";
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
  player1?: IPlayer;
  player2?: IPlayer;
  activePlayer: WhichPlayer;
  board: ICell[];
  boardWidth: number;
  boardHeight: number;
  onPlay: () => void;
  onReset: () => void;
  onCellChosen: (row: number, column: number) => void;
}

const Board = (props: IBoardProps) => {
  const BoardLength = `${CellLength * props.boardWidth +
    CellSpaceBetween * props.boardWidth}${CellLengthUnit}`;
  const BoardStyle = {
    height: BoardLength,
    padding: CellMargin,
    width: BoardLength
  };
  const CellStyle = {
    height: CellHeight,
    margin: CellMargin,
    width: CellWidth
  };

  return (
    <div className="board-container">
      <div className="board" style={BoardStyle}>
        {Array.from(Array(props.boardWidth).keys()).map(
          (row: number, rowIndex: number) => {
            return Array.from(Array(props.boardHeight).keys()).map(
              (column: number, columnIndex: number) => {
                const cell = GameLogic.board.getCell(props, row, column);
                let avatarUrl = "";

                if (cell && cell.player === WhichPlayer.One) {
                  avatarUrl = (props.player1 as IPlayer).avatarUrl;
                } else if (cell && cell.player === WhichPlayer.Two) {
                  avatarUrl = (props.player2 as IPlayer).avatarUrl;
                }

                return (
                  <div
                    className={`cell ${avatarUrl ? "used" : ""}`}
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={event =>
                      props.isPlaying
                        ? props.onCellChosen(row, column)
                        : undefined
                    }
                    key={`${row}-${column}`}
                    style={CellStyle}
                  >
                    {!avatarUrl ? null : (
                      <img
                        className="avatar"
                        src={avatarUrl}
                        title={PlayerUtilities.getAvatarTitle(avatarUrl)}
                      />
                    )}
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
