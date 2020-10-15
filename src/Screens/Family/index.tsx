import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { withToast } from "../../store/ToastProvider";
import { ErrorHandler } from "../../helpers";

import apiClient from "../../api/index";

import { Container, Button, Row, Col } from "react-bootstrap";
import Main from "../Theme/index";
import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";

import {
  deletePic,
  addYellow,
  father,
  mother,
  grandFather,
  grandMother,
  son,
  daughter,
  baby,
  family,
} from "../../assets/imgPath";

import "./family.scss";

type TPerson = {
  id: number;
  familyId: number;
  generationId: number;
  firstname: string;
  lastname: string;
};

type TGeneration = {
  id: number;
  position: number;
  familyId: number;
  peoples: TPerson[];
};

type TGetGenerations = TGeneration[];

type TFamilyRole = { id: number; role: string };

type TFamilyRoles = TFamilyRole[];

const Family = ({ location, setToastVisible }: any) => {
  const history = useHistory();
  const [genList, setGenerationList] = useState<TGetGenerations>([]);
  const [familyRoles, setRolesList] = useState<TFamilyRoles>([]);
  const [modalPersonShow, setModalPerson] = useState<{
    isVisible: boolean;
    additionalDatas: number | null;
  }>({ isVisible: false, additionalDatas: null });
  const [modalGenerationShow, setModalGeneration] = useState<boolean>(false);

  const getFamilyRoles = useCallback(async () => {
    try {
      const response = await apiClient.get(`/roles`);
      const roles = response.data;

      if (roles) {
        let list = roles;
        setRolesList(list);
      }
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't access to family roles");
    }
  }, [setToastVisible]);

  const getGenerations = useCallback(
    async (familyId: number) => {
      try {
        const response = await apiClient.get(
          `/families/${familyId}/generations`
        );
        const generation = response.data;

        if (generation) {
          let list = generation;
          setGenerationList(list);
        }
      } catch (err) {
        ErrorHandler(
          err,
          setToastVisible,
          "We can't access the generation's list."
        );
      }
    },
    [setToastVisible]
  );

  useEffect(() => {
    if (location?.state?.datas) {
      getGenerations(location.state.datas);
      getFamilyRoles();
    }
  }, [location, getGenerations, getFamilyRoles]);

  const createGeneration = async (gen: { position: number }) => {
    const familyId: number = location.state.datas;
    try {
      const response = await apiClient.post(
        `/families/${familyId}/generations`,
        { position: gen.position }
      );
      if (response) getGenerations(familyId);
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't create a new generation.");
    }
  };

  const deleteGeneration = async (generationId: number) => {
    const familyId: number = location.state.datas;

    try {
      const response = await apiClient.delete(
        `/families/${familyId}/generations/${generationId}`
      );

      if (response) getGenerations(location.state.datas);
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't delete this generation.");
    }
  };

  const getRoleId = (role: string) => {
    let roleId: number;
    if (familyRoles?.length > 0) {
      for (let i: number = 0; i < familyRoles.length; i++) {
        if (familyRoles[i].role === role) {
          roleId = familyRoles[i].id;
          return roleId;
        }
      }
    }
    return null;
  };

  const getRoleName = (roleId: number) => {
    let roleName: string = "";
    if (familyRoles?.length > 0) {
      for (let i: number = 0; i < familyRoles.length; i++) {
        if (familyRoles[i].id === roleId) {
          roleName = familyRoles[i].role;
          return roleName.charAt(0).toUpperCase() + roleName.substr(1);
        }
      }
    }
    return roleName;
  };

  const getAvatar = (roleId: number) => {
    switch (getRoleName(roleId).toLowerCase()) {
      case "father":
        return father;

      case "mother":
        return mother;

      case "grand-father":
        return grandFather;

      case "grand-mother":
        return grandMother;

      case "son":
        return son;

      case "daughter":
        return daughter;

      case "baby":
        return baby;

      default:
        return family;
    }
  };

  const createPerson = async (datas: {
    firstname: string;
    lastname: string;
    role: string;
  }) => {
    const familyId: number = location.state.datas;
    const generationId: number | null = modalPersonShow.additionalDatas || null;
    const roleId = getRoleId(datas.role)?.toString();
    if (generationId && roleId) {
      try {
        const response = await apiClient.post(
          `/families/${familyId}/generations/${generationId}/peoples`,
          {
            firstname: datas.firstname,
            lastname: datas.lastname,
            roleId,
          }
        );
        if (response) getGenerations(familyId);
      } catch (err) {
        ErrorHandler(err, setToastVisible, "We can't create this new person.");
      }
    }
  };

  const deletePerson = async (person: TPerson) => {
    const familyId: number = person.familyId;
    const generationId: number = person.generationId;
    const personId: number = person.id;

    try {
      const response = await apiClient.delete(
        `/families/${familyId}/generations/${generationId}/peoples/${personId}`
      );

      if (response) getGenerations(location.state.datas);
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't delete this person.");
    }
  };

  const renderGenerations = () => {
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
          genList.map((gen: TGeneration) => {
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

  return (
    <Main pageTitle="Family">
      <section>
        <Container fluid>
          <Row>
            <Col>
              <Button
                className="back-btn"
                variant="link"
                onClick={() => history.goBack()}
              >
                {`< My Families`}
              </Button>
            </Col>
          </Row>
        </Container>
        {renderGenerations()}
        <Container fluid className="generations-wrapper">
          <Button
            className="generation-head-new"
            onClick={() => setModalGeneration(true)}
          >
            <img src={addYellow} alt="" />
            <p>New Generation</p>
          </Button>
        </Container>
      </section>
      <ModalForm
        title="Generation"
        show={modalGenerationShow}
        inputs={[
          {
            name: "position",
            placeholder: "Ex : 1",
            inputType: "string",
          },
        ]}
        onHide={() => setModalGeneration(false)}
        submit={createGeneration}
      />
    </Main>
  );
};

export default withToast(Family);
