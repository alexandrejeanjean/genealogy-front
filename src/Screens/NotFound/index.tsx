import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Main from '../Theme/index';

function PageNotFound() {
  return (
    <Main>
      <Container>
        <Row>
          <Col>
            <p>Page not found... sorry</p>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}

export default PageNotFound;
