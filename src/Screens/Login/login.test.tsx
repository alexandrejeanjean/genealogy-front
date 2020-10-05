import React from "react";
import { shallow } from "enzyme";
import Login from "./index";

const LoginProps = {
  setIsLogged: jest.fn(),
  isLogged: true,
  setToastVisible: jest.fn(),
};

describe("Login", () => {
  it("should render correctly", () => {
    const Component = shallow(<Login {...LoginProps} />);
    expect(Component).toMatchSnapshot();
  });
});
