import { connect } from "react-redux";

import { IAppState } from "src/App";
import CommandBar from "../components/CommandBar";
import GameLogic from "../GameLogic";
import {
  ActionType,
  IGameStartAction,
  WhichPlayer
} from "../shared/sharedInterfaces";
import { Random } from "../shared/Utilities";

const mapStateToProps = (state: IAppState) => ({
  ...state,
  isReadyToBegin: !state.isPlaying && !!state.player1 && !!state.player2
});

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
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  ...(ownProps.which === WhichPlayer.One
    ? stateProps.player1
    : stateProps.player2),
  isActive: stateProps.isPlaying && stateProps.activePlayer === ownProps.which,
  onPlay: () => {
    dispatchProps.dispatch({
      firstPlayer: stateProps.winner.isWon
        ? GameLogic.player.getNextPLayer(stateProps.activePlayer)
        : Random.getInt_FromInclusiveRange(WhichPlayer.One, WhichPlayer.Two),
      type: ActionType.StartGame
    } as IGameStartAction);
  }
});

const ReduxCommandBar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CommandBar);

export default ReduxCommandBar;
