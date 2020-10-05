import React from "react";
import { shallow } from "enzyme";
import Family from "./index";

const FamilyProps = {
  setToastVisible: jest.fn(),
};

describe("Family", () => {
  it("should render correctly", () => {
    const Component = shallow(<Family {...FamilyProps} />);
    expect(Component).toMatchSnapshot();
  });
});
