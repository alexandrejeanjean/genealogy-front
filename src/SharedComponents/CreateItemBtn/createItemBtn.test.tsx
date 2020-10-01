import React from "react";
import { shallow } from "enzyme";
import CreateItemBtn from "./CreateItemBtn";

describe("CreateItemBtn", () => {
  it("should render correctly", () => {
    const _handleClick = jest.fn();
    const Component = shallow(<CreateItemBtn handleClick={_handleClick} />);
    expect(Component).toMatchSnapshot();
  });
});
