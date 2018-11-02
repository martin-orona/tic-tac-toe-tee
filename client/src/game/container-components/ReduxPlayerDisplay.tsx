import { connect } from "react-redux";

import { IAppState } from "src/App";
import PlayerDisplay from "../components/player/PlayerDisplay";
import { ActionType, WhichPlayer } from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => state;

const mapDispatchToProps = (dispatch: any) => ({
  onChoosePlayer: (which: WhichPlayer) => {
    dispatch({ type: ActionType.EditPlayerBegin, which });
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
    : stateProps.player2),
  isActive: stateProps.isPlaying && stateProps.activePlayer === ownProps.which
});

const ReduxPlayerDisplay = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PlayerDisplay);

export default ReduxPlayerDisplay;
