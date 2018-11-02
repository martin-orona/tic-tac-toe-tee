import { connect } from "react-redux";

import App, { IAppProps } from "./App";
import { ActionType, IAppState } from "./game/shared/sharedInterfaces";
import { callServer_InitialRequest } from "./ServerAPI";

const mapStateToProps = (state: IAppProps) => state;

const mapDispatchToProps = (dispatch: any) => ({ dispatch });

const mergeProps = (
  stateProps: IAppState,
  dispatchProps: any,
  ownProps: any
) => {
  const merged = {
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  };

  merged.server.initialServerCall = () => {
    dispatchProps.dispatch({ type: ActionType.InitialServerRequestBegin });
    // tslint:disable-next-line:no-console
    console.log('"calling" server');
    dispatchProps.dispatch(callServer_InitialRequest(stateProps) as any);
  };

  return merged;
};

export const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(App);
