import React from "react";
import { shallow } from "enzyme";
import Navigationbar from "./index";

describe("Navigationbar", () => {
  it("should render correctly", () => {
    const Component = shallow(<Navigationbar />);
    expect(Component).toMatchSnapshot();
  });
});
