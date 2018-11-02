import * as React from "react";

import ReduxGame from "./game/container-components/ReduxGame";
import { IGameProps } from "./game/Game";
import { IGameState } from "./game/shared/sharedInterfaces";

import "./App.css";

export interface IServerApiState {
  initialServerCallCount: number;
  initialServerResponseCount: number;
  isInitialServerCallMade: boolean;
  initialServerRequestStatus: string;
  serverResponse: string;
}

export interface IServerApiProps extends IServerApiState {
  initialServerCall: () => void;
}

export interface IAppState extends IGameState, IServerApiState {}

export interface IAppProps
  extends IAppState,
    IGameProps,
    IGameState,
    IServerApiProps {}

const App = (props: IAppProps) => {
  if (props.isInitialServerCallMade === false) {
    props.initialServerCall();
  }

  return (
    <div>
      <ReduxGame />

      <div>server response: {props.serverResponse}</div>
    </div>
  );
};

export default App;
