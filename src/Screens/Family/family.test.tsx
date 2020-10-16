import React from "react";
import { shallow, mount } from "enzyme";
import Family from "./index";

const axios = require("axios");
jest.mock("axios");

const mockedEndPoint =
  process.env.REACT_APP_API_URL + "/api/families/{familyId}/generations";

const ResponseDatas = [
  {
    id: 1,
    position: "1",
    peoples: [
      {
        id: 1,
        firstname: "Dark",
        lastname: "Vador",
      },
    ],
  },
  {
    id: 2,
    position: "2",
    peoples: [
      {
        id: 1,
        firstname: "Han",
        lastname: "Solo",
      },
    ],
  },
];

async function getGenerations() {
  const response = await axios.get(mockedEndPoint);
  return response.data;
}

afterAll(() => jest.resetAllMocks());

const FamilyProps = {
  setToastVisible: jest.fn(),
};

describe("Family", () => {
  it("should render correctly", () => {
    const Component = shallow(<Family {...FamilyProps} />);
    expect(Component).toMatchSnapshot();
  });

  it("should return the list of generations", async () => {
    const Component = mount(<Family {...FamilyProps} />);
    axios.get.mockResolvedValueOnce({
      data: ResponseDatas,
    });
    const generations = await getGenerations();
    expect(generations[0].peoples[0].firstname).toEqual("Dark");
    expect(generations[0].peoples[0].lastname).toEqual("Vador");
    expect(generations[0].peoples).toHaveLength(1);
    expect(generations).toHaveLength(2);
    Component.unmount();
  });
});
