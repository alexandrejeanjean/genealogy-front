import React from "react";
import { shallow, mount } from "enzyme";
import ListWrapper from "./ListWrapper";
import CreateItemBtn from "../CreateItemBtn/CreateItemBtn";

const setModalShow = jest.fn();
const BtnProps = {
  handleClick: setModalShow,
};

const Children = <CreateItemBtn {...BtnProps} />;

const ListProps = {
  datas: [{ name: "Armstrong" }],
  children: Children,
  getSubText: jest.fn(),
  handleClick: jest.fn(),
  handleDelete: jest.fn(),
};

describe("ListWrapper", () => {
  it("should render correctly", () => {
    const Component = shallow(<ListWrapper {...ListProps} />);
    expect(Component).toMatchSnapshot();
  });

  it("should render the right number of childrens depending on length of datas array passed in props +1 delete button", () => {
    const Component = mount(<ListWrapper {...ListProps} />);
    expect(Component.find(".card-wrapper").length).toBe(
      ListProps.datas.length + 1
    );
    Component.unmount();
  });
});
