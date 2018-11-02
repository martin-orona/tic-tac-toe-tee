import * as React from "react";

import ReduxGame from "./game/container-components/ReduxGame";
import { IGameState, IServerApiState } from "./game/shared/sharedInterfaces";

import "./App.css";

export interface IServerApiProps extends IServerApiState {
  initialServerCall: () => void;
}

export interface IAppProps {
  game: IGameState;
  server: IServerApiProps;
}

const App = (props: IAppProps) => {
  if (props.server.isInitialServerCallMade === false) {
    props.server.initialServerCall();
  }

  return (
    <div>
      <ReduxGame />

      <div>server response: {props.server.serverResponse}</div>
    </div>
  );
};

export default App;
