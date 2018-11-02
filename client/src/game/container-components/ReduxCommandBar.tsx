import { connect } from "react-redux";

import CommandBar, { IBoardCommandBarProps } from "../components/CommandBar";
import GameLogic from "../GameLogic";
import {
  ActionType,
  IAppState,
  IGameResult,
  IGameStartAction,
  WhichPlayer
} from "../shared/sharedInterfaces";
import { Random } from "../shared/Utilities";

const mapStateToProps = (state: IAppState) => state;

const mapDispatchToProps = (dispatch: any) => ({
  dispatch,
  onReset: () => {
    dispatch({ type: ActionType.ResetGame });
  },
  onShowSettings: () => {
    dispatch({ type: ActionType.EditGameSettingsBegin });
  }
});

const mergeProps = (
  stateProps: IAppState,
  dispatchProps: any,
  ownProps: any
) => {
  const isPlaying =
    stateProps.game.matchState && stateProps.game.matchState.isPlaying;
  const isReadyToBegin =
    !isPlaying &&
    !!stateProps.game.settings.players.player1 &&
    !!stateProps.game.settings.players.player2;
  const winner = stateProps.game.matchState
    ? stateProps.game.matchState.winner
    : ({ isWon: false } as IGameResult);

  return {
    isPlaying,
    isReadyToBegin,
    winner,

    ...dispatchProps,
    ...ownProps,

    onPlay: () => {
      dispatchProps.dispatch({
        firstPlayer: winner.isWon
          ? GameLogic.player.getNextPLayer(winner.player as WhichPlayer)
          : Random.getInt_FromInclusiveRange(WhichPlayer.One, WhichPlayer.Two),
        type: ActionType.StartGame
      } as IGameStartAction);
    }
  } as IBoardCommandBarProps;
};

const ReduxCommandBar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CommandBar);

export default ReduxCommandBar;
