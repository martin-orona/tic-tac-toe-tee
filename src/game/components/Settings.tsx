import * as React from "react";

import "./Settings.css";

export interface ISettingsProps extends IGameSettings {
  winningRowLength: number;
  isSettingsBeingEdited: boolean;
  onAccepted: (settings: IGameSettings) => void;
  onCancelled: () => void;
}

// tslint:disable-next-line:no-empty-interface
export interface IGameSettings {
  boardWidth: number;
  boardHeight: number;
  winningRowLength: number;
}

class Settings extends React.Component<ISettingsProps, IGameSettings> {
  public state = {
    boardHeight: this.props.boardHeight,
    boardWidth: this.props.boardWidth,
    winningRowLength: this.props.winningRowLength
  } as IGameSettings;

  public render() {
    return (
      <div
        className={`settings container ${
          this.props.isSettingsBeingEdited ? "displayed" : ""
        }`}
      >
        <div className="dialog header">Game Settings</div>

        <form
          // tslint:disable-next-line:jsx-no-lambda
          onSubmit={event => {
            event.preventDefault();
            this.props.onAccepted(this.state);
          }}
        >
          <div className="group">
            <label htmlFor="settings-winning-row-length">Winning Row:</label>
            <input
              id="settings-winning-row-length"
              type="text"
              value={this.state.winningRowLength}
              // tslint:disable-next-line:jsx-no-lambda
              onChange={event =>
                this.onIntSettingChange(event, "winningRowLength")
              }
              required={true}
            />
          </div>

          <div className="group">
            <label htmlFor="settings-board-width">Board Width:</label>
            <input
              id="settings-board-width"
              type="text"
              value={this.state.boardWidth}
              // tslint:disable-next-line:jsx-no-lambda
              onChange={event => this.onIntSettingChange(event, "boardWidth")}
              required={true}
            />
          </div>

          <div className="group">
            <label htmlFor="settings-board-height">Board Height:</label>
            <input
              id="settings-board-height"
              type="text"
              value={this.state.boardHeight}
              // tslint:disable-next-line:jsx-no-lambda
              onChange={event => this.onIntSettingChange(event, "boardHeight")}
              required={true}
            />
          </div>

          <div className="action-bar">
            <input
              type="submit"
              className="accept button primary"
              value="Accept"
            />
            <button className="cancel button" onClick={this.props.onCancelled}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  private onIntSettingChange(
    event: React.ChangeEvent<HTMLInputElement>,
    propName: string
  ) {
    event.preventDefault();
    const parsed = parseInt(event.target.value, 10);
    const newState = {};
    newState[propName] = parsed;
    this.setState(newState);
  }
}

export default Settings;
