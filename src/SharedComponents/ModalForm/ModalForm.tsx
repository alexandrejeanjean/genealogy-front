import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FamilySchema, GenerationSchema, PersonSchema } from "../../schemas";
import { Formik } from "formik";

type TInputs = {
  name: string;
  placeholder: string;
  inputType: string;
  datas?: Array<any>;
};

type ModalProps = {
  title: string;
  inputs: TInputs[];
  submit: Function;
  show: boolean;
  onHide: Function;
};

const ModalForm = ({ title, inputs, submit, show, onHide }: ModalProps) => {
  const [initialValues, setInitialValues] = useState({});
  const [schemaValidation, setSchemaValidation] = useState({});

  useEffect(() => {
    if (title.toLowerCase() === "family") {
      setInitialValues({ name: "" });
      setSchemaValidation(FamilySchema);
    }
    if (title.toLowerCase() === "generation") {
      setInitialValues({ position: "" });
      setSchemaValidation(GenerationSchema);
    }

    if (title.toLowerCase() === "person") {
      setInitialValues({ firstname: "", lastname: "", role: "" });
      setSchemaValidation(PersonSchema);
    }
  }, [title]);

  const getInputName = (input: { name: string }) => {
    const inputName = input.name;
    return inputName;
  };

  const setError = (touched: any, errors: any, input: { name: string }) => {
    const inputName = getInputName(input);
    if (touched[inputName]) {
      if (errors[inputName]) {
        return <div className="error-message">{errors[inputName]}</div>;
      }
    }
    return null;
  };

  const setInputValues = (input: { name: string }, values: any) => {
    const inputName = getInputName(input);
    return values[inputName];
  };

  const setErrorClassName = (
    touched: any,
    errors: any,
    input: { name: string }
  ) => {
    const inputName = getInputName(input);
    return touched[inputName] && errors[inputName] ? "has-error" : "";
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={schemaValidation}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            submit(values);
            onHide();
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {inputs.map((input: TInputs) => (
                <Form.Group
                  controlId={"formControl_" + input.name}
                  key={input.placeholder}
                >
                  <Form.Label>
                    {input.name.charAt(0).toUpperCase() + input.name.substr(1)}
                  </Form.Label>
                  {input.inputType === "select" ? (
                    <>
                      <Form.Control
                        as={input.inputType}
                        name={input.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={setErrorClassName(touched, errors, input)}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" disabled>
                          Select the role
                        </option>
                        {input.datas?.map((data) => (
                          <option key={data.role}>{data.role}</option>
                        ))}
                      </Form.Control>
                      {setError(touched, errors, input)}
                    </>
                  ) : (
                    <>
                      <Form.Control
                        type={input.inputType}
                        name={input.name}
                        value={setInputValues(input, values)}
                        placeholder={input.placeholder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={setErrorClassName(touched, errors, input)}
                      />
                      {setError(touched, errors, input)}
                    </>
                  )}
                </Form.Group>
              ))}

              <Button
                type="submit"
                className="btn-primary mt-3"
                disabled={isSubmitting}
              >
                Create {title}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
