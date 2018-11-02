import { connect } from "react-redux";

import { IAppState } from "src/App";
import Board from "../components/board/Board";
import { ActionType } from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => state;

const mapDispatchToProps = (dispatch: any) => ({
  onCellChosen: (row: number, column: number) => {
    dispatch({ type: ActionType.GameCellChosen, row, column });
  }
});

const ReduxBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default ReduxBoard;
