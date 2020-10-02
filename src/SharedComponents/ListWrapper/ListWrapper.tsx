import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import "./listWrapper.scss";

type TListWrapper = {
  datas: any;
  children?: any;
  getSubText?: (id: number) => string;
  getAvatar?: (id: number) => any;
  handleClick: (id: number) => void;
  handleDelete: (item: any) => void;
};

const ListWrapper = ({
  datas,
  children,
  getAvatar,
  getSubText,
  handleClick,
  handleDelete,
}: TListWrapper) => {
  return (
    <Row>
      <Col className="list-item-wrapper">
        <ul className="list-items">
          {datas &&
            datas.map((item: any, i: number) => (
              <li key={i + `_person`}>
                <Card
                  picture={getAvatar && getAvatar(item.roleId)}
                  text={item.name || item.firstname + " " + item.lastname}
                  subtext={getSubText && getSubText(item.roleId)}
                  handleClick={() => handleClick(item.id)}
                  handleDelete={() => handleDelete(item)}
                />
              </li>
            ))}
          <li>{children}</li>
        </ul>
      </Col>
    </Row>
  );
};

export default ListWrapper;
