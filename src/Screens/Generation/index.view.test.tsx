import React from "react";
import { shallow } from "enzyme";
import Generation from "./index.view";

const GenerationProps = {
  genList: [
    {
      id: 0,
      position: 1,
      familyId: 1,
      peoples: [
        {
          id: 0,
          familyId: 1,
          generationId: 1,
          firstname: "Dark",
          lastname: "Vador",
        },
      ],
    },
  ],
  modalPersonShow: { isVisible: false, additionalDatas: null },
  setModalPerson: jest.fn(),
  familyRoles: [{ id: 0, role: "father" }],
  createPerson: jest.fn(),
  deletePerson: jest.fn(),
  deleteGeneration: jest.fn(),
  getAvatar: jest.fn(),
  getRoleName: jest.fn(),
};

describe("Generation", () => {
  it("should render correctly", () => {
    const Component = shallow(<Generation {...GenerationProps} />);
    expect(Component).toMatchSnapshot();
  });
});
