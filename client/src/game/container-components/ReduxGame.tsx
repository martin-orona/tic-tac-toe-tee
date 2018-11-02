import { connect } from "react-redux";

import Game from "../Game";
import { IAppState } from "../shared/sharedInterfaces";

const mapStateToProps = (state: IAppState) => state.game;

const ReduxGame = connect(mapStateToProps)(Game);

export default ReduxGame;
