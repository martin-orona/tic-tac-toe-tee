import * as React from "react";

import Button from "../../../ui-components/actions/Button";
import SubmitButton from "../../../ui-components/actions/SubmitButton";
import ActionBar from "../../../ui-components/containers/ActionBar";
import Container from "../../../ui-components/containers/Container";
import LabeledTextbox from "../../../ui-components/text-input/LabeledTextbox";
import { IPlayer, WhichPlayer } from "../../shared/sharedInterfaces";
import Header from "../Header";
import * as PlayerUtilities from "./PlayerUtilities";

import "./PlayerEditor.css";

import Avatar01 from "../../images/avatar01.png";
import Avatar02 from "../../images/avatar02.png";
import Avatar03 from "../../images/avatar03.png";
import Avatar04 from "../../images/avatar04.png";
import Avatar05 from "../../images/avatar05.png";
import Avatar06 from "../../images/avatar06.png";
import Avatar07 from "../../images/avatar07.png";
import Avatar08 from "../../images/avatar08.png";
import Avatar09 from "../../images/avatar09.png";
import Avatar10 from "../../images/avatar10.png";
import Avatar11 from "../../images/avatar11.png";
import Avatar12 from "../../images/avatar12.png";
import Avatar13 from "../../images/avatar13.png";
import Avatar14 from "../../images/avatar14.png";

const avatars: string[] = [
  Avatar01,
  Avatar02,
  Avatar03,
  Avatar04,
  Avatar05,
  Avatar06,
  Avatar07,
  Avatar08,
  Avatar09,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14
];

export interface IPlayerEditorProps {
  which: WhichPlayer;
  player?: IPlayer;
  onAccepted: (which: WhichPlayer, player: IPlayer) => void;
  onCancelled: () => void;
}

class PlayerEditor extends React.Component<IPlayerEditorProps, IPlayer> {
  public state = {
    avatarUrl: this.props.player ? this.props.player.avatarUrl : Avatar01,
    name: this.props.player ? this.props.player.name : ""
  } as IPlayer;

  public render() {
    return (
      <Container className="player-editor">
        <Header className="dialog">Player Settings</Header>

        <form
          // tslint:disable-next-line:jsx-no-lambda
          onSubmit={event => {
            event.preventDefault();
            this.props.onAccepted(this.props.which, this.state);
          }}
        >
          <LabeledTextbox
            id="player-details-name"
            label="Name"
            value={this.state.name}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={event => this.onNameChange(event)}
            required={true}
          />

          <div className="group">
            <label>Avatar</label>
            <div className="avatars">
              {avatars.map((url: string, index: number) => {
                return (
                  <img
                    key={index}
                    src={url}
                    title={PlayerUtilities.getAvatarTitle(url)}
                    className={url === this.state.avatarUrl ? "selected" : ""}
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={event => this.onAvatarChange(event)}
                  />
                );
              })}
            </div>
          </div>

          <ActionBar>
            <SubmitButton label="Accept" />
            <Button className="Cancel" onClick={this.props.onCancelled}>
              Cancel
            </Button>
          </ActionBar>
        </form>
      </Container>
    );
  }

  private onAvatarChange(event: React.MouseEvent<Element>): void {
    event.preventDefault();
    const img = event.target as HTMLImageElement;
    // tslint:disable-next-line:no-string-literal
    const avatarUrl = img.attributes["src"].nodeValue as string;
    this.setState({ avatarUrl });
  }

  private onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const name = event.target.value;
    this.setState(prev => {
      return { name };
    });
  }
}

export default PlayerEditor;
