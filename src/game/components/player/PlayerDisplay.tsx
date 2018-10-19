import * as React from "react";
import { MouseEventHandler } from "../../sharedInterfaces";
import * as PlayerUtilities from "./PlayerUtilities";

import "./PlayerDisplay.css";

export interface IPlayerDisplayProps {
  name?: string;
  avatarUrl: string;
  onChoosePlayer: MouseEventHandler;
}

const PlayerDisplay = (props: IPlayerDisplayProps) => {
  return (
    <div className="player-display">
      {!props.name ? (
        <button className="button" onClick={props.onChoosePlayer}>
          Choose Player 1
        </button>
      ) : (
        <React.Fragment>
          <img
            className="avatar"
            src={props.avatarUrl}
            title={PlayerUtilities.getAvatarTitle(props.avatarUrl)}
          />
          <label className="name">{props.name}</label>
        </React.Fragment>
      )}
    </div>
  );
};

export default PlayerDisplay;
