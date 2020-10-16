import React from "react";
import { shallow, mount } from "enzyme";
import Dashboard from "./index";

const axios = require("axios");
jest.mock("axios");

const mockedEndPoint = process.env.REACT_APP_API_URL + "/api/families";

const ResponseDatas = [
  {
    id: 1,
    name: "Armstrong",
  },
  {
    id: 2,
    name: "Jazz family",
  },
];

async function getFamilies() {
  const response = await axios.get(mockedEndPoint);
  return response.data;
}

afterAll(() => jest.resetAllMocks());

const DashboardProps = {
  setToastVisible: jest.fn(),
};

describe("Dashboard", () => {
  it("should render correctly", () => {
    const Component = shallow(<Dashboard {...DashboardProps} />);
    expect(Component).toMatchSnapshot();
  });

  it("should return the list of families", async () => {
    const Component = mount(<Dashboard {...DashboardProps} />);
    axios.get.mockResolvedValueOnce({
      data: ResponseDatas,
    });
    const families = await getFamilies();
    expect(families[0].name).toEqual("Armstrong");
    expect(families).toHaveLength(2);
    Component.unmount();
  });
});
