import * as React from "react";
import { IGameResult } from "../../common/sharedInterfaces";

import "./CommandBar.css";

export interface IBoardCommandBarProps {
  isPlaying: boolean;
  isReadyToBegin: boolean;
  winner: IGameResult;
  onPlay: () => void;
  onReset: () => void;
  onShowSettings: () => void;
}

const CommandBar = (props: IBoardCommandBarProps) => {
  return (
    <div className="action-bar">
      <button
        className="settings menu button"
        title="Settings Menu"
        // tslint:disable-next-line:jsx-no-lambda
        onClick={event => props.onShowSettings()}
      >
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </button>

      {!props.isReadyToBegin ? null : (
        <button
          className="play button"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={event => props.onPlay()}
        >
          Play {props.winner.isWon ? " again!" : ""}
        </button>
      )}

      {!props.isPlaying ? null : (
        <button
          className="reset button"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={event => props.onReset()}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default CommandBar;
