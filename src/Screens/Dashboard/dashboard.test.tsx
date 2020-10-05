import React from "react";
import { shallow } from "enzyme";
import Dashboard from "./index";

const DashboardProps = {
  setToastVisible: jest.fn(),
};

describe("Dashboard", () => {
  it("should render correctly", () => {
    const Component = shallow(<Dashboard {...DashboardProps} />);
    expect(Component).toMatchSnapshot();
  });
});
