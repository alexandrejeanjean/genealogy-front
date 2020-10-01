import React from "react";
import { mount } from "enzyme";
import PageTitle from "./PageTitle";

describe("PageTitle", () => {
  it("should render page title if pageTitle props exist and check if props is equal to Dashboard", () => {
    const Component = mount(<PageTitle pageTitle="Dashboard" />);
    expect(Component.props().pageTitle).toEqual("Dashboard");
    expect(Component).toMatchSnapshot();
  });
});
