import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import { WhichPlayer } from "../../shared/sharedInterfaces";
import PlayerDisplay, { IPlayerDisplayProps } from "./PlayerDisplay";
import * as PlayerUtilities from "./PlayerUtilities";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing, no props", () => {
  const props = {} as IPlayerDisplayProps;
  const root = Enzyme.shallow(<PlayerDisplay {...props} />);

  expect(root.name()).toBe("Container");
  expect(root.hasClass("player-display")).toBe(true);
  expect(root.hasClass("active")).toBe(false);

  expect(root.children().length).toBe(1);

  expect(root.childAt(0).text()).toBe("<Button />");
});

it("renders without crashing, isActive", () => {
  const props = { isActive: true } as IPlayerDisplayProps;
  const root = Enzyme.shallow(<PlayerDisplay {...props} />);

  expect(root.name()).toBe("Container");
  expect(root.hasClass("player-display")).toBe(true);
  expect(root.hasClass("active")).toBe(true);
});

it("renders without crashing, player provided", () => {
  // tslint:disable-next-line:variable-name
  let onChoosePlayer_wasCalled = false;
  const props = {
    avatarUrl: "el-url",
    name: "el-namo",
    onChoosePlayer: (which: WhichPlayer) => {
      onChoosePlayer_wasCalled = true;
    },
    which: WhichPlayer.Two
  } as IPlayerDisplayProps;
  const root = Enzyme.shallow(<PlayerDisplay {...props} />);

  expect(root.children().length).toBe(2);

  const image = root.childAt(0);
  expect(image.name()).toBe("img");
  expect(image.hasClass("avatar")).toBe(true);
  expect(image.prop("src")).toBe(props.avatarUrl);
  expect(image.prop("title")).toBe(
    PlayerUtilities.getAvatarTitle(props.avatarUrl)
  );

  const anchor = root.childAt(1);
  expect(anchor.name()).toBe("a");
  expect(anchor.hasClass("name")).toBe(true);
  expect(anchor.prop("href")).toBe("#edit_player");
  anchor.simulate("click");
  expect(onChoosePlayer_wasCalled).toBe(true);
});
