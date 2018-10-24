import * as React from "react";

import Button from "../../../ui-components/actions/Button";
import Container from "../../../ui-components/containers/Container";
import { MouseEventHandler } from "../../shared/sharedInterfaces";
import * as PlayerUtilities from "./PlayerUtilities";

import "./PlayerDisplay.css";

export interface IPlayerDisplayProps {
  isActive: boolean;
  name?: string;
  avatarUrl: string;
  onChoosePlayer: MouseEventHandler;
}

const PlayerDisplay = (props: IPlayerDisplayProps) => {
  return (
    <Container className={`player-display ${props.isActive ? "active" : ""}`}>
      {!props.name ? (
        <Button onClick={props.onChoosePlayer}>Choose Player 1</Button>
      ) : (
        <React.Fragment>
          <img
            className="avatar"
            src={props.avatarUrl}
            title={PlayerUtilities.getAvatarTitle(props.avatarUrl)}
          />
          <a
            className="name"
            href="#edit_player"
            onClick={props.onChoosePlayer}
          >
            {props.name}
          </a>
        </React.Fragment>
      )}
    </Container>
  );
};

export default PlayerDisplay;
