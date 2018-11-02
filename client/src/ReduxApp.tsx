import { connect } from "react-redux";

import App, { IAppProps, IAppState } from "./App";
import { ActionType } from "./game/shared/sharedInterfaces";
import { callServer_InitialRequest } from "./ServerAPI";

const mapStateToProps = (state: IAppProps) => state;

const mapDispatchToProps = (dispatch: any) => ({ dispatch });

const mergeProps = (
  stateProps: IAppState,
  dispatchProps: any,
  ownProps: any
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  initialServerCall: () => {
    dispatchProps.dispatch({ type: ActionType.InitialServerRequestBegin });
    // tslint:disable-next-line:no-console
    console.log('"calling" server');
    dispatchProps.dispatch(callServer_InitialRequest(stateProps) as any);
  }
});

export const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(App);
