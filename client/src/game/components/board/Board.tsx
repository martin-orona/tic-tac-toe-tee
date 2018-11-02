import * as React from "react";

import Container from "../../../ui-components/containers/Container";
import GameLogic from "../../GameLogic";
import {
  IBoardState,
  ICell,
  IGameResult,
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

export interface IBoardProps extends IBoardState {
  onCellChosen: (which: WhichPlayer, row: number, column: number) => void;
  children?: React.ReactNode;
}

const Board = (props: IBoardProps) => {
  const BoardLength = `${CellLength * props.settings.gameSettings.boardWidth +
    CellSpaceBetween *
      props.settings.gameSettings.boardWidth}${CellLengthUnit}`;
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

  const boardInfo = props.matchState
    ? {
        ...props.matchState.matchConfig.gameSettings,
        board: props.matchState.board
      }
    : undefined;
  const player1 = props.matchState
    ? props.matchState.matchConfig.players.player1
    : undefined;
  const player2 = props.matchState
    ? props.matchState.matchConfig.players.player2
    : undefined;
  const winner = props.matchState ? props.matchState.winner : { isWon: false };

  return (
    <Container className="board-container">
      <div className="board" style={BoardStyle}>
        {Array.from(Array(props.settings.gameSettings.boardWidth).keys()).map(
          (row: number, rowIndex: number) => {
            return Array.from(
              Array(props.settings.gameSettings.boardHeight).keys()
            ).map((column: number, columnIndex: number) => {
              const cell = GameLogic.board.getCell(boardInfo, row, column);
              let avatarUrl = "";

              if (cell && cell.player === WhichPlayer.One) {
                avatarUrl = (player1 as IPlayer).avatarUrl;
              } else if (cell && cell.player === WhichPlayer.Two) {
                avatarUrl = (player2 as IPlayer).avatarUrl;
              }

              return (
                <div
                  className={`cell ${avatarUrl ? "used" : ""} ${
                    isWinningCell(winner, row, column) ? "winner" : ""
                  }`}
                  // tslint:disable-next-line:jsx-no-lambda
                  onClick={event => {
                    if (props.matchState && props.matchState.isPlaying) {
                      props.onCellChosen(
                        props.matchState.activePlayer,
                        row,
                        column
                      );
                    }
                  }}
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
            });
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
