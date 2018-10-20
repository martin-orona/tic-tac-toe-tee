import { IPlayer, WhichPlayer } from "../sharedInterfaces";
import TicTacToeTee from "../TicTacToeTee";
import { Random } from "../Utilities";

function startGame(game: TicTacToeTee) {
  game.setState({
    activePlayer: Random.getInt_FromInclusiveRange(
      WhichPlayer.One,
      WhichPlayer.Two
    ),
    isPlaying: true
  });
}

function resetGame(game: TicTacToeTee) {
  game.setState({ isPlaying: false, activePlayer: WhichPlayer.None });
}

// #region player editor

function editPlayer_onBegin(game: TicTacToeTee, which: WhichPlayer) {
  game.setState({ playerBeingEdited: which });
}

function editPlayer_onFinished(game: TicTacToeTee, player: IPlayer) {
  game.setState(prev => {
    return {
      player1:
        prev.playerBeingEdited === WhichPlayer.One ? player : prev.player1,
      player2:
        prev.playerBeingEdited === WhichPlayer.Two ? player : prev.player2,
      playerBeingEdited: WhichPlayer.None
    };
  });
}

function editPlayer_onCancelled(game: TicTacToeTee) {
  game.setState({
    playerBeingEdited: WhichPlayer.None
  });
}

const PlayerEditor = {
  onBeginEdit: editPlayer_onBegin,
  onEditCancelled: editPlayer_onCancelled,
  onEditFinished: editPlayer_onFinished
};
// #endregion player editor

const GameLogic = {
  player: PlayerEditor,
  reset: resetGame,
  start: startGame
};
export default GameLogic;
