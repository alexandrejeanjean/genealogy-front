import React from "react";
import { shallow, mount } from "enzyme";
import ModalForm from "./ModalForm";

const modalShow = true;
const setModalShow = jest.fn();
const createFamily = jest.fn();
const errorMsg = "Error occured.";
const inputsArr = [
  { name: "name", placeholder: "Ex: Armstrong", inputType: "text" },
];
describe("ModalForm", () => {
  it("should render correctly", () => {
    const Component = shallow(
      <ModalForm
        title="Family"
        show={modalShow}
        inputs={inputsArr}
        onHide={() => setModalShow(false)}
        handleSubmit={createFamily}
        errorMsg={errorMsg}
      />
    );
    expect(Component).toMatchSnapshot();
  });

  it("should render form with the right number of inputs passed in props", () => {
    const Component = mount(
      <ModalForm
        title="Family"
        show={modalShow}
        inputs={inputsArr}
        onHide={() => setModalShow(false)}
        handleSubmit={createFamily}
        errorMsg={errorMsg}
      />
    );
    expect(Component.find(".form-group input").length).toBe(inputsArr.length);
    Component.unmount();
  });
});
