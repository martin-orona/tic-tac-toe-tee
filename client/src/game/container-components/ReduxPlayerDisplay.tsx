import { connect } from "react-redux";

import PlayerDisplay from "../components/player/PlayerDisplay";
import { ActionType, IAppState, WhichPlayer } from "../shared/sharedInterfaces";

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
) => {
  const players = stateProps.game.matchState
    ? stateProps.game.matchState.matchConfig.players
    : stateProps.game.settings.players;

  const merged = {
    ...dispatchProps,
    ...ownProps,

    // add player's properties
    ...(ownProps.which === WhichPlayer.One ? players.player1 : players.player2),

    isActive:
      stateProps.game.matchState &&
      stateProps.game.matchState.isPlaying &&
      stateProps.game.matchState.activePlayer === ownProps.which
  };

  return merged;
};

const ReduxPlayerDisplay = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PlayerDisplay);

export default ReduxPlayerDisplay;
