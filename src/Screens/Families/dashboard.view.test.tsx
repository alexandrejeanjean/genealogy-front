import React from "react";
import { shallow } from "enzyme";
import DashboardView from "./dashboard.view";

const list = [{ id: 0, name: "FamilyTest" }];

const DashboardViewProps = {
  setToastVisible: jest.fn(),
  list: list,
  goTo: jest.fn(),
  deleteFamily: jest.fn(),
  setModalShow: jest.fn(),
  modalShow: false,
  createFamily: jest.fn(),
};

describe("DashboardView", () => {
  it("should render correctly", () => {
    const Component = shallow(<DashboardView {...DashboardViewProps} />);
    expect(Component).toMatchSnapshot();
  });
});
