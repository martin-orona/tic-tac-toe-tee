import * as React from "react";

import { IGameSettings, IGameState } from "../shared/sharedInterfaces";

import Button from "../../ui-components/actions/Button";
import SubmitButton from "../../ui-components/actions/SubmitButton";
import ActionBar from "../../ui-components/containers/ActionBar";
import Container from "../../ui-components/containers/Container";
import LabeledTextbox from "../../ui-components/text-input/LabeledTextbox";
import Header from "./Header";

import "./Settings.css";

type ISettingsState = IGameState;

export interface ISettingsProps extends ISettingsState {
  onAccepted: (settings: IGameSettings) => void;
  onCancelled: () => void;
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  public state = { ...this.props } as ISettingsState;

  public render() {
    return (
      <Container
        className={`settings floater ${
          this.props.isSettingsBeingEdited ? "displayed" : ""
        }`}
      >
        <Header className="dialog">Game Settings</Header>

        <form
          // tslint:disable-next-line:jsx-no-lambda
          onSubmit={event => {
            event.preventDefault();
            this.props.onAccepted(this.state.settings.gameSettings);
          }}
        >
          <LabeledTextbox
            id="settings-winning-row-length"
            label="Winning Row"
            value={this.state.settings.gameSettings.winningRowLength}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={event =>
              this.onIntSettingChange(event, "winningRowLength")
            }
            required={true}
          />

          <LabeledTextbox
            id="settings-board-width"
            label="Board Width"
            value={this.state.settings.gameSettings.boardWidth}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={event => this.onIntSettingChange(event, "boardWidth")}
            required={true}
          />

          <LabeledTextbox
            id="settings-board-height"
            label="Board Height"
            value={this.state.settings.gameSettings.boardHeight}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={event => this.onIntSettingChange(event, "boardHeight")}
            required={true}
          />

          <ActionBar>
            <SubmitButton label="Accept" />
            <Button
              className="cancel"
              // tslint:disable-next-line:jsx-no-lambda
              onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                this.props.onCancelled();
                this.setState({ ...this.props } as ISettingsState);
              }}
            >
              Cancel
            </Button>
          </ActionBar>
        </form>
      </Container>
    );
  }

  private onIntSettingChange(
    event: React.ChangeEvent<HTMLInputElement>,
    propName: string
  ) {
    event.preventDefault();

    const parsed = parseInt(event.target.value, 10);
    if (isNaN(parsed)) {
      return;
    }

    const newState = {};
    newState[propName] = parsed;

    this.setState({
      ...this.state,
      settings: {
        ...this.state.settings,
        gameSettings: {
          ...this.state.settings.gameSettings,
          [propName]: parsed
        }
      }
    } as ISettingsState);
  }
}

export default Settings;
