import React from "react";
import { shallow } from "enzyme";
import LoginForm from "./LoginForm";

const LoginFormProps = {
  _handleSubmit: jest.fn(),
  isSignUp: true,
  setSignUpForm: jest.fn(),
};

describe("LoginForm", () => {
  it("should render correctly", () => {
    const Component = shallow(<LoginForm {...LoginFormProps} />);
    expect(Component).toMatchSnapshot();
  });
});
