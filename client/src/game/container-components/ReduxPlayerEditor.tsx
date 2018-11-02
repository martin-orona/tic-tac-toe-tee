import { connect } from "react-redux";

import PlayerEditor from "../components/player/PlayerEditor";
import {
  ActionType,
  IAppState,
  IPlayer,
  WhichPlayer
} from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => state;

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
  ...dispatchProps,
  ...ownProps,

  player:
    stateProps.game.playerBeingEdited === WhichPlayer.One
      ? stateProps.game.settings.players.player1
      : stateProps.game.settings.players.player2,
  which: stateProps.game.playerBeingEdited
});

const ReduxPlayerEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PlayerEditor);

export default ReduxPlayerEditor;
