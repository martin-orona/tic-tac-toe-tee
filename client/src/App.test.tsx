import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import App, { IAppProps } from "./App";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  // const div = document.createElement("div");

  const props = {
    server: { isInitialServerCallMade: true }
  } as IAppProps;
  const wrapper = Enzyme.shallow(<App {...props} />);

  expect(wrapper.find("div")).toHaveLength(2);
  expect(
    wrapper
      .find("div")
      .at(0)
      .text()
  ).toContain("<Connect(Game) />");

  expect(
    wrapper
      .find("div")
      .at(0)
      .hasClass("app container")
  ).toBe(true);

  expect(
    wrapper
      .find("div")
      .at(0)
      .childAt(0)
      .text()
  ).toBe("<Connect(Game) />");

  // expect(wrapper.find("div.what-now").text()).toBe("how now");

  // ReactDOM.render(<App {...props} />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
