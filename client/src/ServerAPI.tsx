import { IAppProps, IAppState } from "./App";
import {
  ActionType,
  IAction,
  IReceivedInitialServerResponseAction
} from "./game/shared/sharedInterfaces";
import {
  IActionHandlerDictionary,
  IAsyncActionHandlerDictionary
} from "./game/shared/Utilities";

export const ServerActionHandlers: IActionHandlerDictionary = {
  async: {} as IAsyncActionHandlerDictionary,
  sync: {
    [ActionType.InitialServerRequestBegin]: initialServerRequestBegin,
    [ActionType.InitialServerRequestInProgress]: initialServerRequestInProgress,
    [ActionType.InitialServerRequestComplete]: receivedInitialServerResponse
  }
};

function receivedInitialServerResponse(
  state: IAppProps,
  action: IReceivedInitialServerResponseAction
) {
  return {
    ...state,
    initialServerResponseCount: state.initialServerResponseCount + 1,
    serverResponse: `${
      action.serverResponse
    } ${state.initialServerResponseCount + 1}`
  } as IAppProps;
}

function initialServerRequestBegin(state: IAppState, action: IAction) {
  return {
    ...state,
    initialServerRequestStatus: "begun",
    isInitialServerCallMade: true
  } as IAppState;
}

function initialServerRequestInProgress(state: IAppState, action: IAction) {
  return { ...state, initialServerRequestStatus: "in progress" } as IAppState;
}

export function callServer_InitialRequest(state: IAppState) {
  if (state.isInitialServerCallMade) {
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
