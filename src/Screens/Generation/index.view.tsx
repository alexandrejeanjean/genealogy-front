import React from "react";

import { Container, Button, Row, Col } from "react-bootstrap";

import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";

import { deletePic } from "../../assets/imgPath";

type TPerson = {
  id: number;
  familyId: number;
  generationId: number;
  firstname: string;
  lastname: string;
};

type TGenerationItem = {
  id: number;
  position: number;
  familyId: number;
  peoples: TPerson[];
};

type TGetGenerations = TGenerationItem[];

type TFamilyRole = { id: number; role: string };

type TFamilyRoles = TFamilyRole[];

type TGeneration = {
  genList: TGetGenerations;
  modalPersonShow: { isVisible: boolean; additionalDatas: number | null };
  setModalPerson: Function;
  familyRoles: TFamilyRoles;
  createPerson: Function;
  deletePerson: Function;
  deleteGeneration: Function;
  getAvatar: Function;
  getRoleName: Function;
};

const Generation = ({
  genList,
  modalPersonShow,
  familyRoles,
  setModalPerson,
  createPerson,
  deletePerson,
  deleteGeneration,
  getAvatar,
  getRoleName,
}: TGeneration) => {
  return (
    <>
      <ModalForm
        title="Person"
        show={modalPersonShow.isVisible}
        inputs={[
          { name: "firstname", placeholder: "Ex: Luis", inputType: "text" },
          {
            name: "lastname",
            placeholder: "Ex: Armstrong",
            inputType: "text",
          },
          {
            name: "role",
            placeholder: "Ex: Grand-father",
            inputType: "select",
            datas: familyRoles,
          },
        ]}
        onHide={() =>
          setModalPerson({ isVisible: false, additionalDatas: null })
        }
        submit={createPerson}
      />

      {genList &&
        genList.map((gen: TGenerationItem) => {
          return (
            <Container fluid key={gen.position}>
              <Row>
                <Col className="generations-wrapper">
                  <Row>
                    <Col className="generation-head">
                      <p>Génération : {gen.position}</p>
                      <button
                        className="delete-btn"
                        onClick={() => deleteGeneration(gen.id)}
                      >
                        <img src={deletePic} alt="delete button" />
                      </button>
                    </Col>
                  </Row>

                  <ListWrapper
                    datas={gen.peoples}
                    getAvatar={(roleId: number) => getAvatar(roleId)}
                    getSubText={(roleId: number) => getRoleName(roleId)}
                    handleClick={() => console.log("click")}
                    handleDelete={(person: TPerson) => deletePerson(person)}
                  >
                    <CreateItemBtn
                      handleClick={() =>
                        setModalPerson({
                          isVisible: true,
                          additionalDatas: gen.id,
                        })
                      }
                    />
                  </ListWrapper>
                </Col>
              </Row>
            </Container>
          );
        })}
    </>
  );
};

export default Generation;
