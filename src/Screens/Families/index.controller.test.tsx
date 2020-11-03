import React from "react";
import { shallow, mount } from "enzyme";
import FamilyModel from "../../models/family.model";
import Families from "./index.controller";
import { apiGetFamilies } from "./families.api";
const axios = require("axios");
jest.mock("axios");

const mockedApiClient = {
  apiGetFamilies: jest.fn(),
};

const rawFamily = [
  {
    id: 1,
    name: "Armstrong",
    userId: 1,
  },
  {
    id: 2,
    name: "Jazz family",
    userId: 2,
  },
];

afterAll(() => jest.resetAllMocks());

const FamiliesProps = {
  setToastVisible: jest.fn(),
};

describe("Families", () => {
  it("should render correctly", () => {
    const Component = shallow(<Families {...FamiliesProps} />);
    expect(Component).toMatchSnapshot();
  });
});

describe("Family API", () => {
  it("should return the list of families", async () => {
    mockedApiClient.apiGetFamilies.mockResolvedValueOnce(rawFamily);
    const families = await mockedApiClient.apiGetFamilies(
      FamiliesProps.setToastVisible
    );
    expect(families).toEqual(rawFamily.map((family) => family));
  });
});
