import * as React from "react";

import Container from "../ui-components/containers/Container";
import Header from "./components/Header";
import ReduxBoard from "./container-components/ReduxBoard";
import ReduxCommandBar from "./container-components/ReduxCommandBar";
import ReduxPlayerDisplay from "./container-components/ReduxPlayerDisplay";
import ReduxPlayerEditor from "./container-components/ReduxPlayerEditor";
import ReduxSettings from "./container-components/ReduxSettings";
import { IGameState, WhichPlayer } from "./shared/sharedInterfaces";

import "./Game.css";

export type IGameProps = IGameState;

const Game = (props: IGameProps) => {
  return (
    <Container className="tic-tac-toe-tee game">
      <Header>Tic Tac Toe Tee</Header>

      {props.playerBeingEdited !== WhichPlayer.None ||
      props.isSettingsBeingEdited ? null : (
        <Container className="body-container">
          <ReduxPlayerDisplay which={WhichPlayer.One} />

          <ReduxBoard>
            <ReduxCommandBar />
          </ReduxBoard>

          <ReduxPlayerDisplay which={WhichPlayer.Two} />
        </Container>
      )}

      {props.playerBeingEdited === WhichPlayer.None ? null : (
        <ReduxPlayerEditor />
      )}

      <ReduxSettings />
    </Container>
  );
};

export default Game;
