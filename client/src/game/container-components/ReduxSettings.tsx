import { connect } from "react-redux";

import { IAppState } from "src/App";
import Settings from "../components/Settings";
import {
  ActionType,
  IEditGameSettingsCompleteAction,
  IGameSettings,
  WhichPlayer
} from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => state;

const mapDispatchToProps = (dispatch: any) => ({
  onAccepted: (settings: IGameSettings) => {
    dispatch({
      settings,
      type: ActionType.EditGameSettingsComplete
    } as IEditGameSettingsCompleteAction);
  },
  onCancelled: () => {
    dispatch({ type: ActionType.EditGameSettingsCancelled });
  }
});

const mergeProps = (
  stateProps: IAppState,
  dispatchProps: any,
  ownProps: any
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  ...(ownProps.which === WhichPlayer.One
    ? stateProps.player1
    : stateProps.player2)
});

const ReduxSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Settings);

export default ReduxSettings;
