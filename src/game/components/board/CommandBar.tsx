import * as React from "react";
import { IGameResult } from "../../common/sharedInterfaces";

import "./CommandBar.css";

export interface ICommandBarProps {
  isPlaying: boolean;
  isReadyToBegin: boolean;
  winner: IGameResult;
  onPlay: () => void;
  onReset: () => void;
}

const CommandBar = (props: ICommandBarProps) => {
  return (
    <div className="action-bar">
      {!props.isReadyToBegin ? null : (
        <button
          className="button"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={event => props.onPlay()}
        >
          Play {props.winner.isWon ? " again!" : ""}
        </button>
      )}

      {!props.isPlaying ? null : (
        <button
          className="button"
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
