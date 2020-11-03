import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Main from "../Theme/index.view";
import { tree } from "../../assets/imgPath";
import "./notFound.scss";

const PageNotFound = () => {
  return (
    <Main>
      <Container fluid className="not-found-wrapper">
        <Row>
          <Col className="w-100 vh-100 d-flex justify-content-center align-items-center flex-column">
            <img src={tree} alt="" width="200px" />
            <p className="mt-3">Page not found... sorry</p>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default PageNotFound;
