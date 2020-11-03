import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { withToast } from "../../store/ToastProvider";
import { ErrorHandler } from "../../helpers";

import apiClient from "../../api/index";

import {
  apiGetGenerations,
  apiCreateGeneration,
  apiDeleteGeneration,
} from "../Generation/generation.api";

import { apiCreatePerson, apiDeletePerson } from "../Person/person.api";

import { apiGetRoles } from "../Roles/roles.api";

import { Container, Button, Row, Col } from "react-bootstrap";
import Main from "../Theme/index.view";
import Generation from "../Generation/index.view";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";

import {
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
    apiGetRoles(setToastVisible)
      .then((list) => setRolesList(list))
      .catch((err) => console.log(err));
  }, [setToastVisible]);

  const getGenerations = useCallback(
    async (familyId: number) => {
      apiGetGenerations(setToastVisible, familyId)
        .then((res) => setGenerationList(res))
        .catch((err) => console.log(err));
    },
    [setToastVisible]
  );

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

  useEffect(() => {
    if (location?.state?.datas) {
      getGenerations(location.state.datas);
      getFamilyRoles();
    }
  }, [location, getGenerations, getFamilyRoles]);

  const createGeneration = async (gen: { position: number }) => {
    const familyId: number = location.state.datas;
    apiCreateGeneration(setToastVisible, gen, familyId)
      .then(() => getGenerations(familyId))
      .catch((err) => console.log(err));
  };

  const deleteGeneration = async (generationId: number) => {
    const familyId: number = location.state.datas;
    apiDeleteGeneration(setToastVisible, familyId, generationId)
      .then(() => getGenerations(familyId))
      .catch((err) => console.log(err));
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
      apiCreatePerson(setToastVisible, datas, familyId, generationId, roleId)
        .then(() => getGenerations(familyId))
        .catch((err) => console.log(err));
    }
  };

  const deletePerson = async (person: TPerson) => {
    const familyId: number = person.familyId;
    const generationId: number = person.generationId;
    const personId: number = person.id;

    apiDeletePerson(setToastVisible, familyId, generationId, personId)
      .then(() => getGenerations(location.state.datas))
      .catch((err) => console.log(err));
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
        <Generation
          genList={genList}
          modalPersonShow={modalPersonShow}
          setModalPerson={setModalPerson}
          familyRoles={familyRoles}
          createPerson={createPerson}
          deletePerson={deletePerson}
          deleteGeneration={deleteGeneration}
          getAvatar={getAvatar}
          getRoleName={getRoleName}
        />
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
