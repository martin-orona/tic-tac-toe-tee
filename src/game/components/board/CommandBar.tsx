import * as React from "react";

import "./CommandBar.css";

export interface ICommandBarProps {
  isPlaying: boolean;
  isReadyToBegin: boolean;
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
          Play
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
