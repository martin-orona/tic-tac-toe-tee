import GameLogic, { GameActionHandlers } from "./GameLogic";
import {
  ActionType,
  IAction,
  IAppState,
  IBeginEditPlayerAction,
  ICell,
  ICellChosenAction,
  ICompleteEditPlayerAction,
  IEditGameSettingsCompleteAction,
  IGameStartAction,
  IMatchState,
  WhichPlayer
} from "./shared/sharedInterfaces";
import { buildState } from "./shared/Utilities";

function reduce(type: ActionType, state: IAppState, action: IAction) {
  return GameActionHandlers.sync[type](state, action);
}

describe("edit game settings", () => {
  it("begin", () => {
    const initial = {} as IAppState;
    const action = {} as IAction;
    const actual = reduce(ActionType.EditGameSettingsBegin, initial, action);
    expect(actual.game.isSettingsBeingEdited).toBe(true);
  });

  it("accept", () => {
    const initial = { game: { isSettingsBeingEdited: true } } as IAppState;
    const action = {
      settings: { boardHeight: 8, boardWidth: 8, winningRowLength: 8 }
    } as IEditGameSettingsCompleteAction;

    const actual = reduce(ActionType.EditGameSettingsComplete, initial, action);

    expect(actual.game.isSettingsBeingEdited).toBe(false);
    expect(JSON.stringify(actual.game.settings.gameSettings)).toBe(
      JSON.stringify(action.settings)
    );
  });

  it("cancel", () => {
    const initial = {} as IAppState;
    const action = {} as IAction;
    const actual = reduce(ActionType.EditGameSettingsComplete, initial, action);
    expect(actual.game.isSettingsBeingEdited).toBe(false);
  });
});

describe("edit player", () => {
  it("begin", () => {
    const initial = {} as IAppState;
    const action = { which: WhichPlayer.Two } as IBeginEditPlayerAction;
    const actual = reduce(ActionType.EditPlayerBegin, initial, action);
    expect(actual.game.playerBeingEdited).toBe(action.which);
  });

  it("accept, not playing", () => {
    const initial = {
      game: { settings: { players: { player1: {}, player2: {} } } }
    } as IAppState;
    const action = {
      player: { name: "billy", avatarUrl: "bob" },
      which: WhichPlayer.Two
    } as ICompleteEditPlayerAction;

    const actual = reduce(ActionType.EditPlayerBeginComplete, initial, action);

    expect(actual.game.playerBeingEdited).toBe(WhichPlayer.None);
    expect(JSON.stringify(actual.game.settings.players.player1)).toBe(
      JSON.stringify(initial.game.settings.players.player1)
    );
    expect(JSON.stringify(actual.game.settings.players.player2)).toBe(
      JSON.stringify(action.player)
    );
  });

  it("accept, playing", () => {
    const initial = {
      game: {
        matchState: {},
        settings: { players: { player1: {}, player2: {} } }
      }
    } as IAppState;
    const action = {
      player: { name: "billy", avatarUrl: "bob" },
      which: WhichPlayer.Two
    } as ICompleteEditPlayerAction;

    const actual = reduce(ActionType.EditPlayerBeginComplete, initial, action);

    expect(actual.game.playerBeingEdited).toBe(WhichPlayer.None);
    expect(JSON.stringify(actual.game.settings.players.player1)).toBe(
      JSON.stringify(initial.game.settings.players.player1)
    );
    expect(JSON.stringify(actual.game.settings.players.player2)).toBe(
      JSON.stringify(action.player)
    );
    expect(
      JSON.stringify(
        (actual.game.matchState as IMatchState).matchConfig.players.player1
      )
    ).toBe(JSON.stringify(initial.game.settings.players.player1));
    expect(
      JSON.stringify(
        (actual.game.matchState as IMatchState).matchConfig.players.player2
      )
    ).toBe(JSON.stringify(action.player));
  });

  it("cancel", () => {
    const initial = {} as IAppState;
    const action = {} as IAction;
    const actual = reduce(ActionType.EditPlayerCancelled, initial, action);
    expect(actual.game.playerBeingEdited).toBe(WhichPlayer.None);
  });
});

describe("play game", () => {
  it("start", () => {
    const initial = {
      game: {
        settings: {
          gameSettings: { boardHeight: 8, boardWidth: 8, winningRowLength: 8 }
        }
      }
    } as IAppState;
    const action = { firstPlayer: WhichPlayer.One } as IGameStartAction;

    const actual = reduce(ActionType.StartGame, initial, action);

    const actualMatch = actual.game.matchState as IMatchState;
    expect(actualMatch.activePlayer).toBe(action.firstPlayer);
    expect(actualMatch.board.length).toBe(
      initial.game.settings.gameSettings.boardHeight *
        initial.game.settings.gameSettings.boardWidth
    );
    expect(actualMatch.isPlaying).toBe(true);
    expect(JSON.stringify(actualMatch.matchConfig)).toBe(
      JSON.stringify(initial.game.settings)
    );
    expect(actualMatch.winner.isWon).toBe(false);
  });

  it("reset", () => {
    const initial = {
      game: {
        settings: {
          gameSettings: { boardHeight: 8, boardWidth: 8, winningRowLength: 8 }
        }
      }
    } as IAppState;
    const action = { firstPlayer: WhichPlayer.One } as IGameStartAction;

    const actual = reduce(ActionType.ResetGame, initial, action);

    const actualMatch = actual.game.matchState as IMatchState;
    expect(actualMatch.activePlayer).toBe(WhichPlayer.None);
    expect(actualMatch.board.length).toBe(
      initial.game.settings.gameSettings.boardHeight *
        initial.game.settings.gameSettings.boardWidth
    );
    expect(actualMatch.isPlaying).toBe(false);
    expect(JSON.stringify(actualMatch.matchConfig)).toBe(
      JSON.stringify(initial.game.settings)
    );
    expect(actualMatch.winner.isWon).toBe(false);
  });

  describe("pick cell", () => {
    describe("don't win", () => {
      it("first cell", () => {
        const { which, initial } = getInitialState();
        const action = { row: 0, column: 0, which } as ICellChosenAction;
        doNotWin(initial, action);
      });

      it("second cell", () => {
        const { which, initial } = getInitialState(
          {
            game: { settings: { gameSettings: { winningRowLength: 3 } } }
          } as IAppState,
          {
            game: { matchState: { board: [{ player: WhichPlayer.One }] } }
          } as IAppState
        );

        const action = { row: 0, column: 1, which } as ICellChosenAction;

        doNotWin(initial, action);
      });
    });

    describe("win", () => {
      it("horizontal forward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [{ player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 0, column: 1, which } as ICellChosenAction;

        win(initial, action);
      });

      it("horizontal backward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [, { player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 0, column: 0, which } as ICellChosenAction;

        win(initial, action);
      });

      it("vertical forward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [, { player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 1, column: 1, which } as ICellChosenAction;

        win(initial, action);
      });

      it("vertical backward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [, , , { player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 0, column: 1, which } as ICellChosenAction;

        win(initial, action);
      });

      it("diagonal down forward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [{ player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 1, column: 1, which } as ICellChosenAction;

        win(initial, action);
      });

      it("diagonal down backward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [, , , { player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 0, column: 0, which } as ICellChosenAction;

        win(initial, action);
      });

      it("diagonal up forward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [, , { player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 0, column: 1, which } as ICellChosenAction;

        win(initial, action);
      });

      it("diagonal up backward", () => {
        const { which, initial } = getInitialState(undefined, {
          game: { matchState: { board: [, , { player: WhichPlayer.One }] } }
        } as IAppState);

        const action = { row: 0, column: 1, which } as ICellChosenAction;

        win(initial, action);
      });
    });

    function getInitialState(preMods?: IAppState, postMods?: IAppState) {
      const which = WhichPlayer.One;
      let initial = {
        game: {
          settings: {
            gameSettings: {
              boardHeight: 2,
              boardWidth: 2,
              winningRowLength: 2
            }
          }
        }
      } as IAppState;

      if (preMods) {
        initial = buildState(initial, preMods);
      }

      initial = reduce(ActionType.StartGame, initial, {
        firstPlayer: which
      } as IGameStartAction);

      if (postMods) {
        initial = buildState(initial, postMods);
      }

      return { which, initial };
    }

    function doNotWin(initial: IAppState, action: ICellChosenAction) {
      const actual = reduce(ActionType.GameCellChosen, initial, action);

      const actualMatch = actual.game.matchState as IMatchState;
      const boardInfo = {
        ...actualMatch.matchConfig.gameSettings,
        board: actualMatch.board
      };

      expect(actualMatch.isPlaying).toBe(true);
      expect(
        (GameLogic.board.getCell(boardInfo, action.row, action.column) as ICell)
          .player
      ).toBe(action.which);
      expect(actualMatch.winner.isWon).toBe(false);
    }

    function win(initial: IAppState, action: ICellChosenAction) {
      const actual = reduce(ActionType.GameCellChosen, initial, action);

      const actualMatch = actual.game.matchState as IMatchState;
      const boardInfo = {
        ...actualMatch.matchConfig.gameSettings,
        board: actualMatch.board
      };

      expect(actualMatch.isPlaying).toBe(false);
      expect(
        (GameLogic.board.getCell(boardInfo, action.row, action.column) as ICell)
          .player
      ).toBe(action.which);
      expect(actualMatch.winner.isWon).toBe(true);
    }
  });
});
