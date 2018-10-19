import * as React from "react";
import Board from "./components/board/Board";
import Header from "./components/Header";
import PlayerDisplay from "./components/player/PlayerDisplay";
import PlayerEditor from "./components/player/PlayerEditor";
import { IPlayer, WhichPlayer } from "./sharedInterfaces";

import "./TicTacToeTee.css";

import DefaultAvatar from "./images/avatar01.png";

export interface IGameProps {
  player1?: IPlayer;
  player2?: IPlayer;
}

export interface IGameState {
  isPlaying: boolean;
  player1?: IPlayer;
  player2?: IPlayer;
  playerBeingEdited: WhichPlayer;
}

class TicTacToeTee extends React.Component<IGameProps, IGameState> {
  public state = {
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

          <div className="body-container">
            <PlayerDisplay
              name={this.state.player1 ? this.state.player1.name : undefined}
              avatarUrl={
                this.state.player1
                  ? this.state.player1.avatarUrl
                  : DefaultAvatar
              }
              // tslint:disable-next-line:jsx-no-lambda
              onChoosePlayer={() => this.onBeginChoosePlayer1()}
            />

            <Board
              {...this.state}
              isReadyToBegin={
                !this.state.isPlaying &&
                !!this.state.player1 &&
                !!this.state.player2
              }
              // tslint:disable-next-line:jsx-no-lambda
              onPlay={() => this.onStartGame()}
              // tslint:disable-next-line:jsx-no-lambda
              onReset={() => this.onResetGame()}
            />

            <PlayerDisplay
              name={this.state.player2 ? this.state.player2.name : undefined}
              avatarUrl={
                this.state.player2
                  ? this.state.player2.avatarUrl
                  : DefaultAvatar
              }
              // tslint:disable-next-line:jsx-no-lambda
              onChoosePlayer={() => this.onBeginChoosePlayer2()}
            />
          </div>

          {this.state.playerBeingEdited === WhichPlayer.None ? null : (
            <PlayerEditor
              player={
                this.state.playerBeingEdited === WhichPlayer.One
                  ? this.state.player1
                  : this.state.player2
              }
              // tslint:disable-next-line:jsx-no-lambda
              onAccepted={(player: IPlayer) =>
                this.onFinishedEditingPlayer(player)
              }
              // tslint:disable-next-line:jsx-no-lambda
              onCancelled={() => this.onCancelledEditingPlayer()}
            />
          )}
        </div>
      </React.Fragment>
    );
  }

  private onBeginChoosePlayer1() {
    this.setState({ playerBeingEdited: WhichPlayer.One });
  }

  private onBeginChoosePlayer2() {
    this.setState({ playerBeingEdited: WhichPlayer.Two });
  }

  private onFinishedEditingPlayer(player: IPlayer) {
    this.setState(prev => {
      return {
        player1:
          prev.playerBeingEdited === WhichPlayer.One ? player : prev.player1,
        player2:
          prev.playerBeingEdited === WhichPlayer.Two ? player : prev.player2,
        playerBeingEdited: WhichPlayer.None
      };
    });
  }

  private onCancelledEditingPlayer() {
    this.setState({
      playerBeingEdited: WhichPlayer.None
    });
  }

  private onStartGame() {
    this.setState({ isPlaying: true });
  }
  private onResetGame() {
    this.setState({ isPlaying: false });
  }
}

export default TicTacToeTee;
