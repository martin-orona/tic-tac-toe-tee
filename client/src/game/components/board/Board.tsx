import * as React from "react";

import Container from "../../../ui-components/containers/Container";
import GameLogic from "../../GameLogic";
import {
  ICell,
  IGameResult,
  IGameSettings,
  IPlayer,
  WhichPlayer
} from "../../shared/sharedInterfaces";
import * as PlayerUtilities from "../player/PlayerUtilities";

import "./Board.css";

const CellSpaceBetween = 1;
const CellLength = 4;
const CellLengthUnit = "em";
const CellHeight = `${CellLength}${CellLengthUnit}`;
const CellWidth = `${CellLength}${CellLengthUnit}`;
const CellMargin = `${CellSpaceBetween / 2}${CellLengthUnit}`;

export interface IBoardProps {
  isPlaying: boolean;
  winner: IGameResult;
  player1?: IPlayer;
  player2?: IPlayer;
  activePlayer: WhichPlayer;
  board: ICell[];
  gameSettings: IGameSettings;
  onCellChosen: (row: number, column: number) => void;
  children?: React.ReactNode;
}

const Board = (props: IBoardProps) => {
  const BoardLength = `${CellLength * props.gameSettings.boardWidth +
    CellSpaceBetween * props.gameSettings.boardWidth}${CellLengthUnit}`;
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
    <Container className="board-container">
      <div className="board" style={BoardStyle}>
        {Array.from(Array(props.gameSettings.boardWidth).keys()).map(
          (row: number, rowIndex: number) => {
            return Array.from(Array(props.gameSettings.boardHeight).keys()).map(
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
                    className={`cell ${avatarUrl ? "used" : ""} ${
                      isWinningCell(props.winner, row, column) ? "winner" : ""
                    }`}
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

      {props.children}
    </Container>
  );
};

function isWinningCell(
  winner: IGameResult,
  row: number,
  column: number
): boolean {
  if (!winner.isWon) {
    return false;
  }

  let isWinner = false;

  // NOTE: This looks like an inefficient search, but the list is short.
  for (const cell of winner.cells as ICell[]) {
    if (cell.row === row && cell.column === column) {
      isWinner = true;
      break;
    }
  }

  return isWinner;
}

export default Board;
