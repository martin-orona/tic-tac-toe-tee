import { connect } from "react-redux";

import { IAppState } from "src/App";
import PlayerEditor from "../components/player/PlayerEditor";
import { ActionType, IPlayer, WhichPlayer } from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => ({
  ...state,
  player:
    state.playerBeingEdited === WhichPlayer.One ? state.player1 : state.player2,
  which: state.playerBeingEdited
});

const mapDispatchToProps = (dispatch: any) => ({
  onAccepted: (which: WhichPlayer, player: IPlayer) => {
    dispatch({ type: ActionType.EditPlayerBeginComplete, player, which });
  },
  onCancelled: () => {
    dispatch({ type: ActionType.EditPlayerCancelled });
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

const ReduxPlayerEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PlayerEditor);

export default ReduxPlayerEditor;
