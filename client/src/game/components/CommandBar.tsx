import * as React from "react";

import Button from "../../ui-components/actions/Button";
import HamburgerButton from "../../ui-components/actions/HamburgerButton";
import ActionBar from "../../ui-components/containers/ActionBar";
import { IGameResult } from "../shared/sharedInterfaces";

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
    <ActionBar>
      <HamburgerButton
        className="settings"
        title="Settings Menu"
        // tslint:disable-next-line:jsx-no-lambda
        onClick={event => props.onShowSettings()}
      />

      {!props.isReadyToBegin ? null : (
        <Button
          className="play"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={event => props.onPlay()}
        >
          Play {props.winner.isWon ? " again!" : ""}
        </Button>
      )}

      {!props.isPlaying ? null : (
        <Button
          className="reset"
          // tslint:disable-next-line:jsx-no-lambda
          onClick={event => props.onReset()}
        >
          Cancel
        </Button>
      )}
    </ActionBar>
  );
};

export default CommandBar;
