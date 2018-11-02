import { IAppState } from "../../App";
import { IAction } from "./sharedInterfaces";

// #region math

// #region random numbers

/**
 * Returns a random integer within the inclusive range specified by the arguments.
 * @param min inclusive - lowest integer to generate.
 * @param max inclusive - highest integer to generate.
 */
function getInt_FromInclusiveRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Random = { getInt_FromInclusiveRange };

// #endregion random numbers

// #endregion math

// #region redux

// #region redux reducers

export interface ISyncActionHandlerDictionary {
  [key: string]: (state: IAppState, action: IAction) => IAppState;
}

export interface IAsyncActionHandlerDictionary {
  [key: string]: (
    state: IAppState,
    action: IAction
  ) => (dispatch: any) => Promise<any>;
}

export interface IActionHandlerDictionary {
  sync: ISyncActionHandlerDictionary;
  async?: IAsyncActionHandlerDictionary;
}

// NOTE: A "reducer" is a function that converts the current app state into
// a new app state; a la Array.reduce(); aka, state + action -> state.
function registerReducers(
  initialState: IAppState,
  reducers: IActionHandlerDictionary
) {
  return function reducer(state: IAppState = initialState, action: IAction) {
    if (reducers.sync.hasOwnProperty(action.type)) {
      // tslint:disable-next-line:no-console
      console.log(`sync action handler: ${action.type}`);
      return reducers.sync[action.type](state, action);
    } else if (reducers.async && reducers.async.hasOwnProperty(action.type)) {
      return (dispatch: any) => {
        // tslint:disable-next-line:no-console
        console.log(`Async action handler: ${action.type}`);
        return (reducers.async as IAsyncActionHandlerDictionary)[action.type];
      };
    } else {
      return state;
    }
  };
}

export const Reducers = { register: registerReducers };

// #endregion redux reducers

// #endregion redux
