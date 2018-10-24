import * as React from "react";

import Container from "../ui-components/containers/Container";
import Board from "./components/board/Board";
import CommandBar from "./components/CommandBar";
import Header from "./components/Header";
import PlayerDisplay from "./components/player/PlayerDisplay";
import PlayerEditor from "./components/player/PlayerEditor";
import Settings, { IGameSettings } from "./components/Settings";
import GameLogic from "./GameLogic";
import {
  ICell,
  IGameResult,
  IPlayer,
  WhichPlayer
} from "./shared/sharedInterfaces";

import "./Game.css";

import DefaultAvatar from "./images/avatar01.png";

export interface IGameProps {
  player1?: IPlayer;
  player2?: IPlayer;
}

export interface IGameState extends IGameSettings {
  isPlaying: boolean;
  activePlayer: WhichPlayer;
  player1?: IPlayer;
  player2?: IPlayer;
  playerBeingEdited: WhichPlayer;
  winner: IGameResult;
  board: ICell[];
  // boardWidth: number;
  // boardHeight: number;
  // winningRowLength: number;
  //  ===== ISettingsProps =====
  isSettingsBeingEdited: boolean;
}

class Game extends React.Component<IGameProps, IGameState> {
  public state = {
    activePlayer: WhichPlayer.None,
    board: [],
    boardHeight: 5,
    boardWidth: 5,
    isPlaying: false,
    isSettingsBeingEdited: false,
    player1: this.props.player1,
    player2: this.props.player2,
    playerBeingEdited: WhichPlayer.None,
    winner: { isWon: false },
    winningRowLength: 4
  } as IGameState;

  public showSettings(): void {
    this.setState({ isSettingsBeingEdited: true });
  }

  public updateSettings(settings: IGameSettings): void {
    this.setState(settings, () => this.hideSettings());
  }

  public hideSettings(): void {
    this.setState({ isSettingsBeingEdited: false });
  }

  public render() {
    return (
      <Container className="tic-tac-toe-tee game">
        <Header>Tic Tac Toe Tee</Header>

        {this.state.playerBeingEdited !== WhichPlayer.None ||
        this.state.isSettingsBeingEdited ? null : (
          <Container className="body-container">
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
              // tslint:disable-next-line:jsx-no-lambda
              onCellChosen={(row: number, column: number) =>
                GameLogic.cellChosen(this, row, column)
              }
            >
              <CommandBar
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
                onShowSettings={() => this.showSettings()}
              />
            </Board>

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
          </Container>
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

        <Settings
          {...this.state}
          // tslint:disable-next-line:jsx-no-lambda
          onAccepted={(settings: IGameSettings) =>
            this.updateSettings(settings)
          }
          // tslint:disable-next-line:jsx-no-lambda
          onCancelled={() => this.hideSettings()}
        />
      </Container>
    );
  }
}

export default Game;
