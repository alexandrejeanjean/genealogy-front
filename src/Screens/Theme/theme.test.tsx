import React from "react";
import { shallow } from "enzyme";
import Theme from "./index";

describe("Theme", () => {
  it("should render correctly", () => {
    const Component = shallow(<Theme />);
    expect(Component).toMatchSnapshot();
  });
});
