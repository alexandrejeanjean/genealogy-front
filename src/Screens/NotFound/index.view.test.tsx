import React from "react";
import { shallow } from "enzyme";
import NotFound from "./index.view";

describe("NotFound", () => {
  it("should render correctly", () => {
    const Component = shallow(<NotFound />);
    expect(Component).toMatchSnapshot();
  });
});
