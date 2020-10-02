import React from "react";
import { mount } from "enzyme";
import PageTitle from "./PageTitle";

describe("PageTitle", () => {
  it("should render page title if pageTitle props exist and check if props is equal to Dashboard", () => {
    const Component = mount(<PageTitle pageTitle="Dashboard" />);
    expect(Component.props().pageTitle).toEqual("Dashboard");
    Component.unmount();
  });

  it("should render page title with text Dashboard", () => {
    const Component = mount(<PageTitle pageTitle="Dashboard" />);
    expect(Component.find("h1").text()).toEqual("Dashboard");
    expect(Component).toMatchSnapshot();
    Component.unmount();
  });
});
