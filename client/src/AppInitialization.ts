import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { GameActionHandlers } from "./game/GameLogic";
import { IActionHandlerDictionary, Reducers } from "./game/shared/Utilities";
import { ServerActionHandlers } from "./ServerAPI";

import Avatar2 from "./game/images/avatar01.png";
import Avatar1 from "./game/images/avatar02.png";
import { IAppState, WhichPlayer } from "./game/shared/sharedInterfaces";

export const AppDefaultState: IAppState = {
  game: {
    settings: {
      gameSettings: {
        boardHeight: 5,
        boardWidth: 5,
        winningRowLength: 4
      },
      players: {
        player1: { name: "Jen", avatarUrl: Avatar1 },
        player2: { name: "Ben", avatarUrl: Avatar2 }
      }
    },

    isSettingsBeingEdited: false,
    playerBeingEdited: WhichPlayer.None
  },
  server: {
    initialServerCallCount: 0,
    initialServerRequestStatus: "unknown",
    initialServerResponseCount: 0,
    isInitialServerCallMade: false,
    serverResponse: "no request made yet"
  }
};

const AllHandlers: IActionHandlerDictionary = mergeActionHandlers([
  GameActionHandlers,
  ServerActionHandlers
]);

export function createAppStateStore(
  initialState: IAppState = AppDefaultState,
  actionHandlers?: IActionHandlerDictionary[],
  middleware?: any
) {
  const configuredActionHandlers = mergeActionHandlers([
    AllHandlers,
    ...(actionHandlers || [])
  ]);

  const reducer = Reducers.register(initialState, configuredActionHandlers);

  const configuredMiddleware = !middleware
    ? [thunkMiddleware]
    : [...middleware, thunkMiddleware];

  const stateStore = createStore(
    reducer,
    initialState,
    applyMiddleware(...configuredMiddleware)
  );

  return stateStore;
}

function mergeActionHandlers(handlers: IActionHandlerDictionary[]) {
  if (handlers.length === 1) {
    return handlers[0];
  }

  let sync = {};
  let async = {};

  for (const handler of handlers) {
    sync = Object.assign(sync, handler.sync);

    if (handler.async) {
      async = Object.assign(async, handler.async);
    }
  }

  const merged = { sync } as IActionHandlerDictionary;
  if (Object.keys(async).length > 0) {
    merged.async = async;
  }

  return merged;
}
