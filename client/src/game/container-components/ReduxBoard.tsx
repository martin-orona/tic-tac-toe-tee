import { connect } from "react-redux";

import Board from "../components/board/Board";
import { ActionType, IAppState, WhichPlayer } from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => state.game;

const mapDispatchToProps = (dispatch: any) => ({
  onCellChosen: (which: WhichPlayer, row: number, column: number) => {
    dispatch({ type: ActionType.GameCellChosen, row, column, which });
  }
});

const ReduxBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default ReduxBoard;
