import React from "react";
import { shallow } from "enzyme";
import LoadingLazyPage from "./LoadingLazyPage";

describe("LoadingLazyPage", () => {
  it("should render correctly", () => {
    const Component = shallow(<LoadingLazyPage />);
    expect(Component).toMatchSnapshot();
  });
});
