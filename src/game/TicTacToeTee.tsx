import * as React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import PlayerEditor from "./components/PlayerEditor";
import { IPlayer, WhichPlayer } from "./sharedInterfaces";

import "./TicTacToeTee.css";

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
    let chooser = null;
    if (this.state.playerBeingEdited !== WhichPlayer.None) {
      chooser = (
        <PlayerEditor
          player={
            this.state.playerBeingEdited === WhichPlayer.One
              ? this.state.player1
              : this.state.player2
          }
          // tslint:disable-next-line:jsx-no-lambda
          onAccepted={(player: IPlayer) => this.onFinishedEditingPlayer(player)}
          // tslint:disable-next-line:jsx-no-lambda
          onCancelled={() => this.onCancelledEditingPlayer()}
        />
      );
    }
    return (
      <React.Fragment>
        <div className="tic-tac-toe-tee game">
          <Header />
          <Nav
            {...this.state}
            // tslint:disable-next-line:jsx-no-lambda
            onChoosePlayer1={() => this.onBeginChoosePlayer1()}
            // tslint:disable-next-line:jsx-no-lambda
            onChoosePlayer2={() => this.onBeginChoosePlayer2()}
            // tslint:disable-next-line:jsx-no-lambda
            onPlay={() => this.onStartGame()}
            // tslint:disable-next-line:jsx-no-lambda
            onReset={() => this.onResetGame()}
          />
          {chooser}
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
    const a = 3;
    return a + 1;
  }
  private onResetGame() {
    const a = 3;
    return a + 1;
  }
}

export default TicTacToeTee;
