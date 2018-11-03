import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import PlayerEditor, { IPlayerEditorProps } from "./PlayerEditor";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing, no props", () => {
  const props = {} as IPlayerEditorProps;
  const root = Enzyme.shallow(<PlayerEditor {...props} />);

  expect(root.name()).toBe("Container");
  expect(root.hasClass("player-editor")).toBe(true);

  const header = root.childAt(0);
  expect(header.text()).toBe("<Header />");
  expect(header.childAt(0).text()).toBe("Player Settings");

  const form = root.childAt(1);
  expect(form.name()).toBe("form");

  const namebox = form.childAt(0);
  expect(namebox.text()).toBe("<LabeledTextbox />");
  expect(namebox.children.length).toBe(1);
  expect(namebox.html()).toContain(">Name:<");
  expect(namebox.html()).toContain('<input type="text"');

  const imageGroup = form.childAt(1);
  expect(imageGroup.name()).toBe("div");
  expect(imageGroup.hasClass("group")).toBe(true);

  const imageLabel = imageGroup.childAt(0);
  expect(imageLabel.name()).toBe("label");
  expect(imageLabel.text()).toBe("Avatar");

  const avatarsContainer = imageGroup.childAt(1);
  expect(avatarsContainer.name()).toBe("div");
  expect(avatarsContainer.hasClass("avatars")).toBe(true);
  expect(avatarsContainer.children.length).toBe(1);
  expect(avatarsContainer.find("img").length).toBe(14);

  const actionBar = form.childAt(2);
  expect(actionBar.text()).toBe("<ActionBar />");
  expect(actionBar.html()).toContain(">Accept<");
  expect(actionBar.html()).toContain(">Cancel<");
});
