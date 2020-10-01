import React from "react";
import { shallow } from "enzyme";
import ModalForm from "./ModalForm";

describe("ModalForm", () => {
  it("should render correctly", () => {
    const modalShow = true;
    const setModalShow = jest.fn();
    const createFamily = jest.fn();
    const errorMsg = "Error occured.";

    const Component = shallow(
      <ModalForm
        title="Family"
        show={modalShow}
        inputs={[
          { name: "name", placeholder: "Ex: Armstrong", inputType: "text" },
        ]}
        onHide={() => setModalShow(false)}
        handleSubmit={createFamily}
        errorMsg={errorMsg}
      />
    );
    expect(Component).toMatchSnapshot();
  });
});
