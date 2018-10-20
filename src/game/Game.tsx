import * as React from "react";
import { IPlayer, WhichPlayer } from "./common/sharedInterfaces";
import Board from "./components/board/Board";
import Header from "./components/Header";
import PlayerDisplay from "./components/player/PlayerDisplay";
import PlayerEditor from "./components/player/PlayerEditor";
import GameLogic, { ICell } from "./GameLogic";

import "./Game.css";

import DefaultAvatar from "./images/avatar01.png";

export interface IGameProps {
  player1?: IPlayer;
  player2?: IPlayer;
}

export interface IGameState {
  isPlaying: boolean;
  activePlayer: WhichPlayer;
  player1?: IPlayer;
  player2?: IPlayer;
  playerBeingEdited: WhichPlayer;
  board: ICell[];
  boardWidth: number;
  boardHeight: number;
}

class Game extends React.Component<IGameProps, IGameState> {
  public state = {
    activePlayer: WhichPlayer.None,
    board: [],
    boardHeight: 3,
    boardWidth: 3,
    isPlaying: false,
    player1: this.props.player1,
    player2: this.props.player2,
    playerBeingEdited: WhichPlayer.None
  } as IGameState;

  public render() {
    return (
      <React.Fragment>
        <div className="tic-tac-toe-tee game">
          <Header />

          {this.state.playerBeingEdited !== WhichPlayer.None ? null : (
            <div className="body-container">
              <PlayerDisplay
                isActive={this.state.activePlayer === WhichPlayer.One}
                name={this.state.player1 ? this.state.player1.name : undefined}
                avatarUrl={
                  this.state.player1
                    ? this.state.player1.avatarUrl
                    : DefaultAvatar
                }
                // tslint:disable-next-line:jsx-no-lambda
                onChoosePlayer={() =>
                  GameLogic.player.onBeginEdit(this, WhichPlayer.One)
                }
              />

              <Board
                {...this.state}
                isReadyToBegin={
                  !this.state.isPlaying &&
                  !!this.state.player1 &&
                  !!this.state.player2
                }
                // tslint:disable-next-line:jsx-no-lambda
                onPlay={() => GameLogic.start(this)}
                // tslint:disable-next-line:jsx-no-lambda
                onReset={() => GameLogic.reset(this)}
                // tslint:disable-next-line:jsx-no-lambda
                onCellChosen={(row: number, column: number) =>
                  GameLogic.cellChosen(this, row, column)
                }
              />

              <PlayerDisplay
                isActive={this.state.activePlayer === WhichPlayer.Two}
                name={this.state.player2 ? this.state.player2.name : undefined}
                avatarUrl={
                  this.state.player2
                    ? this.state.player2.avatarUrl
                    : DefaultAvatar
                }
                // tslint:disable-next-line:jsx-no-lambda
                onChoosePlayer={() =>
                  GameLogic.player.onBeginEdit(this, WhichPlayer.Two)
                }
              />
            </div>
          )}

          {this.state.playerBeingEdited === WhichPlayer.None ? null : (
            <PlayerEditor
              player={
                this.state.playerBeingEdited === WhichPlayer.One
                  ? this.state.player1
                  : this.state.player2
              }
              // tslint:disable-next-line:jsx-no-lambda
              onAccepted={(player: IPlayer) =>
                GameLogic.player.onEditFinished(this, player)
              }
              // tslint:disable-next-line:jsx-no-lambda
              onCancelled={() => GameLogic.player.onEditCancelled(this)}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Game;
