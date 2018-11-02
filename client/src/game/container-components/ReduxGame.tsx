import { connect } from "react-redux";

import { IAppState } from "../../App";
import Game from "../Game";

const mapStateToProps = (state: IAppState) => state;

const ReduxGame = connect(mapStateToProps)(Game);

export default ReduxGame;
