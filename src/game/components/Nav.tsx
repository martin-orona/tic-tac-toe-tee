import * as React from "react";
import { IPlayer, MouseEventHandler, WhichPlayer } from "../sharedInterfaces";

import "./Nav.css";

export interface INavProps {
  player1?: IPlayer;
  player2?: IPlayer;
  isPlaying: boolean;
  playerBeingEdited: WhichPlayer;
  onChoosePlayer1: MouseEventHandler;
  onChoosePlayer2: MouseEventHandler;
  onPlay: MouseEventHandler;
  onReset: MouseEventHandler;
}

const Nav = (props: INavProps) => {
  return (
    <div className="nav">
      {props.player1 ? null : (
        <button
          className="player-chooser"
          onClick={props.onChoosePlayer1}
          disabled={props.playerBeingEdited !== WhichPlayer.None}
        >
          Choose Player 1
        </button>
      )}
      {props.player2 ? null : (
        <button
          className="player-chooser"
          onClick={props.onChoosePlayer2}
          disabled={props.playerBeingEdited !== WhichPlayer.None}
        >
          Choose Player 2
        </button>
      )}
      {props.isPlaying ? null : (
        <button className="play" disabled={!props.player1 || !props.player2}>
          Play
        </button>
      )}
      {!props.isPlaying ? null : (
        <button className="player-chooser">Choose Player 2</button>
      )}
    </div>
  );
};

export default Nav;
