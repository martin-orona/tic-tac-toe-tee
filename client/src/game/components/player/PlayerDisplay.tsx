import * as React from "react";

import Button from "../../../ui-components/actions/Button";
import Container from "../../../ui-components/containers/Container";
import { WhichPlayer } from "../../shared/sharedInterfaces";
import * as PlayerUtilities from "./PlayerUtilities";

import "./PlayerDisplay.css";

export interface IPlayerDisplayProps {
  isActive: boolean;
  name?: string;
  avatarUrl: string;
  which: WhichPlayer;
  onChoosePlayer: (which: WhichPlayer) => void;
}

const PlayerDisplay = (props: IPlayerDisplayProps) => {
  return (
    <Container className={`player-display ${props.isActive ? "active" : ""}`}>
      {!props.name ? (
        <Button
          // tslint:disable-next-line:jsx-no-lambda
          onClick={() => props.onChoosePlayer(props.which)}
        >
          Choose Player
        </Button>
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
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => props.onChoosePlayer(props.which)}
          >
            {props.name}
          </a>
        </React.Fragment>
      )}
    </Container>
  );
};

export default PlayerDisplay;
