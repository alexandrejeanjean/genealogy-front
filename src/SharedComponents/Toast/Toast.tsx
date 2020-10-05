import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./toast.scss";

type TToast = {
  color?: string;
  msg: string;
};

const Toast = ({ color, msg }: TToast) => (
  <Container fluid className={`toast-wrapper toast-wrapper--${color}`}>
    <Row>
      <Col>{msg}</Col>
    </Row>
  </Container>
);

export default Toast;
