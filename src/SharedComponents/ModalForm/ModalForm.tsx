import React, { PureComponent } from "react";
import { Form, Button, Modal } from "react-bootstrap";

type TInputs = {
  name: string;
  placeholder: string;
  inputType: string;
  datas?: Array<any>;
};

type Props = {
  title: string;
  inputs: TInputs[];
  submit: Function;

  show: boolean;
  onHide: Function;
};

interface State {
  name: string;
  firstname: string;
  lastname: string;
  position: number | null;
  role: string;
}

class ModalForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      position: null,
      firstname: "",
      lastname: "",
      role: "",
    };
  }

  // Simple inputs verificator: will improve this with a json-validator
  checkDatas = () => {
    const { name, role, firstname, lastname, position } = this.state;
    const { title } = this.props;

    if (["Person"].indexOf(title) > -1) {
      if (role === "" || firstname === "" || lastname === "") {
        return true;
      }
    } else if (["Family"].indexOf(title) > -1) {
      if (name === "") {
        return true;
      }
    } else if (["Generation"].indexOf(title) > -1) {
      if (!position) {
        return true;
      }
    } else {
      return false;
    }
  };

  handleChange = (event: React.FormEvent<{ name: string; value: string }>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState(({ [name]: value } as unknown) as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { onHide, submit } = this.props;
    submit(this.state);
    onHide();
  };

  render() {
    const { title, inputs, onHide, show } = this.props;

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            {inputs.map((input: TInputs) => (
              <Form.Group
                controlId={"formControl_" + input.name}
                key={input.placeholder}
              >
                <Form.Label>
                  {input.name.charAt(0).toUpperCase() + input.name.substr(1)}
                </Form.Label>
                {input.inputType === "select" ? (
                  <Form.Control
                    as={input.inputType}
                    name={input.name}
                    onChange={this.handleChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select the role
                    </option>
                    {input.datas?.map((data) => (
                      <option key={data.role}>{data.role}</option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={input.inputType}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={this.handleChange}
                  />
                )}
              </Form.Group>
            ))}

            <Button
              type="submit"
              className="btn-primary mt-3"
              disabled={this.checkDatas()}
            >
              Create {title}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalForm;
