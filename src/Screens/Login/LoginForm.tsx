import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { LoginSchema } from "../../schemas";
import { tree } from "../../assets/imgPath";

import "./loginForm.scss";

type TLoginForm = {
  _handleSubmit: Function;
  isSignUp: boolean;
  setSignUpForm: Function;
};

const LoginForm = ({ _handleSubmit, isSignUp, setSignUpForm }: TLoginForm) => {
  return (
    <Container fluid className="login-wrapper">
      <Row className="vh-100">
        <Col
          xs={12}
          sm={12}
          md={4}
          className="left d-flex flex-column justify-content-center align-items-center"
        >
          <div className="left-mobile-title-wrapper mb-4">
            <img src={tree} alt="genealogy-logo" className="dna-logo" />
            <h1>Family tree</h1>
          </div>
          <div className="left-desktop-title-wrapper mb-4">
            <h1>{isSignUp ? "Sign up" : "Connexion"}</h1>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              _handleSubmit(values);
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
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Ex: Anakin@skywalker.io "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    className={
                      touched.username && errors.username ? "has-error" : ""
                    }
                  />
                  {touched.username && errors.username ? (
                    <div className="error-message">{errors.username}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Ex: min 8 characters"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    className={
                      touched.password && errors.password ? "has-error" : ""
                    }
                  />
                  {touched.password && errors.password ? (
                    <div className="error-message">{errors.password}</div>
                  ) : null}
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-primary mt-3"
                  disabled={isSubmitting}
                >
                  {isSignUp ? "Sign up" : "Sign In"}
                </Button>
              </Form>
            )}
          </Formik>
          <Button
            className="mt-2"
            variant="link"
            onClick={() => setSignUpForm(!isSignUp)}
          >
            {isSignUp ? "Sign in here !" : "Sign up here !"}
          </Button>
        </Col>
        <Col md={8} className="right-desktop-title-wrapper">
          <img src={tree} alt="" className="right-desktop-logo" />
          <h2>Welcome to Family Tree</h2>
          <h3>
            Start your journey now <br /> & build an amazing tree of life
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
