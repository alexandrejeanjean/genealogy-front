import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import Main from "../Theme/index";
import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";
import apiClient from "../../api/index";
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

interface TFamilyProps {
  location: { state: { datas: number } };
}

type TFamilyRole = { id: number; role: string };

type TFamilyRoles = TFamilyRole[];

const Family = ({ location }: any) => {
  const history = useHistory();
  const [genList, setGenerationList] = useState<TGetGenerations>([]);
  const [familyRoles, setRolesList] = useState<TFamilyRoles>([]);
  const [modalPersonShow, setModalPerson] = useState<{
    isVisible: boolean;
    additionalDatas: number | null;
  }>({ isVisible: false, additionalDatas: null });
  const [modalGenerationShow, setModalGeneration] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getFamilyRoles = async () => {
    try {
      const response = await apiClient.get(`/roles`);
      const roles = response.data;

      if (roles) {
        let list = roles;
        setRolesList(list);
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: get roles", axiosError.response);
        setErrorMsg(
          "Sorry, an error has occured. We can't access family roles."
        );
        return axiosError.response.data;
      } else if (err && err.request) {
        setErrorMsg(JSON.stringify(err.message));
        return err.message;
      } else {
        setErrorMsg("Error. Try again, or contact us.");
      }

      throw err;
    }
  };

  const getGenerations = async (familyId: number) => {
    try {
      const response = await apiClient.get(`/families/${familyId}/generations`);
      const generation = response.data;

      if (generation) {
        let list = generation;
        setGenerationList(list);
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: get generation", axiosError.response);
        setErrorMsg(
          "Sorry, an error has occured. We can't access the generation's list."
        );
        return axiosError.response.data;
      } else if (err && err.request) {
        setErrorMsg(JSON.stringify(err.message));
        return err.message;
      } else {
        setErrorMsg("Error. Try again, or contact us.");
      }

      throw err;
    }
  };

  useEffect(() => {
    if (location?.state?.datas) {
      getGenerations(location.state.datas);
      getFamilyRoles();
    }
  }, [location]);

  const createGeneration = async (gen: { position: number }) => {
    const familyId: number = location.state.datas;
    try {
      const response = await apiClient.post(
        `/families/${familyId}/generations`,
        { position: gen.position }
      );
      if (response) getGenerations(familyId);
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: create generation", axiosError.response);
        setErrorMsg(
          "Sorry, an error has occured. We can't create a new generation."
        );
        return axiosError.response.data;
      } else if (err && err.request) {
        setErrorMsg(JSON.stringify(err.message));
        return err.message;
      } else {
        setErrorMsg("Error. Try again, or contact us.");
      }
      throw err;
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
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: delete generation", axiosError.response);
        setErrorMsg(
          "Sorry, an error has occured. We can't delete this generation."
        );
        return axiosError.response.data;
      } else if (err && err.request) {
        setErrorMsg(JSON.stringify(err.message));
        return err.message;
      } else {
        setErrorMsg("Error. Try again, or contact us.");
      }
      throw err;
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
        if (err && err.response) {
          const axiosError = err;
          console.log("Error :: create person", axiosError.response);
          setErrorMsg(
            "Sorry, an error has occured. We can't create this new person."
          );
          return axiosError.response.data;
        } else if (err && err.request) {
          setErrorMsg(JSON.stringify(err.message));
          return err.message;
        } else {
          setErrorMsg("Error. Try again, or contact us.");
        }
        throw err;
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
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: delete person", axiosError.response);
        setErrorMsg(
          "Sorry, an error has occured. We can't delete this person."
        );
        return axiosError.response.data;
      } else if (err && err.request) {
        setErrorMsg(JSON.stringify(err.message));
        return err.message;
      } else {
        setErrorMsg("Error. Try again, or contact us.");
      }
      throw err;
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
          handleSubmit={createPerson}
          errorMsg={errorMsg}
        />
        {errorMsg && <p className="error-text ml-5">{errorMsg}</p>}
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
            inputType: "text",
          },
        ]}
        onHide={() => setModalGeneration(false)}
        handleSubmit={createGeneration}
        errorMsg={errorMsg}
      />
      {errorMsg && <p className="error-text ml-5">{errorMsg}</p>}
    </Main>
  );
};

export default Family;
