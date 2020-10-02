import React from "react";
import { shallow, mount } from "enzyme";
import Card from "./Card";
import { family } from "../../assets/imgPath";

const CardProps = {
  text: "Family 1",
  picture: family,
  handleClick: jest.fn(),
  handleDelete: jest.fn(),
};

describe("Card", () => {
  it("should render correctly", () => {
    const Component = shallow(<Card {...CardProps} />);
    expect(Component).toMatchSnapshot();
  });
});
