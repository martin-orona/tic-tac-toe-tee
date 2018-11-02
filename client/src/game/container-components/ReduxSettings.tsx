import { connect } from "react-redux";

import Settings from "../components/Settings";
import {
  ActionType,
  IAppState,
  IEditGameSettingsCompleteAction,
  IGameSettings
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
  ...stateProps.game,
  ...dispatchProps,
  ...ownProps
});

const ReduxSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Settings);

export default ReduxSettings;
