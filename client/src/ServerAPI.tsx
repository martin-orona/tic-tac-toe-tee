import * as _ from "lodash";

import { IAppProps } from "./App";
import {
  ActionType,
  IAction,
  IAppState,
  IReceivedInitialServerResponseAction
} from "./game/shared/sharedInterfaces";
import {
  IActionHandlerDictionary,
  IAsyncActionHandlerDictionary
} from "./game/shared/Utilities";

export const ServerActionHandlers: IActionHandlerDictionary = {
  async: {} as IAsyncActionHandlerDictionary,
  sync: {
    [ActionType.InitialServerRequestBegin]: initialServerRequest_begin,
    [ActionType.InitialServerRequestInProgress]: initialServerRequest_InProgress,
    [ActionType.InitialServerRequestComplete]: initialServerRequest_complete
  }
};

function initialServerRequest_begin(state: IAppState, action: IAction) {
  return _.merge({}, state, {
    server: {
      initialServerRequestStatus: "begun",
      isInitialServerCallMade: true
    }
  });
}

function initialServerRequest_InProgress(state: IAppState, action: IAction) {
  return _.merge({}, state, {
    server: {
      initialServerRequestStatus: "in progress"
    }
  });
}

function initialServerRequest_complete(
  state: IAppProps,
  action: IReceivedInitialServerResponseAction
) {
  return _.merge({}, state, {
    server: {
      initialServerRequestStatus: "complete",
      initialServerResponseCount: state.server.initialServerResponseCount + 1,
      serverResponse: `${action.serverResponse} ${state.server
        .initialServerResponseCount + 1}`
    }
  });
}

export function callServer_InitialRequest(state: IAppState) {
  if (state.server.isInitialServerCallMade) {
    return state;
  }

  return function initialServerRequestCaller(dispatch: any) {
    dispatch({ type: ActionType.InitialServerRequestInProgress });

    return fetch("/api/hello")
      .then(
        (response: Response) => {
          return response.json();
        },
        (error: any) =>
          dispatch({ type: ActionType.InitialServerRequestFailed, error })
      )
      .then((response: any) =>
        dispatch({
          serverResponse: response.express,
          type: ActionType.InitialServerRequestComplete
        })
      );
  };
}

// function componentDidMount(state: IAppProps, action: IGameStartAction) {
//   if (state.isInitialServerCallMade) {
//     return;
//   }

//   callApi()
//     // .then(res => this.setState({ response: res.express }))
//     .then(res =>
//       stateStore.dispatch({
//         serverResponse: res.express,
//         type: ActionType.InitialServerRequestComplete
//       })
//     )
//     .catch(err => {
//       // tslint:disable-next-line:no-console
//       console.log(err);
//     });

//   return {
//     ...state,
//     initialServerCallCount: state.initialServerCallCount + 1,
//     isInitialServerCallMade: true
//   };
// }

// async function callApi() {
//   const response = await fetch("/api/hello");
//   const body = await response.json();

//   if (response.status !== 200) {
//     throw Error(body.message);
//   }

//   return body;
// }
