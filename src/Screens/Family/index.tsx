import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import Main from "../Theme/index";
import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";
import apiClient from "../../api/index";
import deletePic from "../../assets/delete.svg";
import addYellow from "../../assets/add-yellow.svg";
import father from "../../assets/avatars/father.svg";
import mother from "../../assets/avatars/mother.svg";
import grandFather from "../../assets/avatars/grandfather.svg";
import grandMother from "../../assets/avatars/grandmother.svg";
import son from "../../assets/avatars/son.svg";
import daughter from "../../assets/avatars/daughter.svg";
import baby from "../../assets/avatars/baby.svg";
import family from "../../assets/family.svg";
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
        return axiosError.response.data;
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
        return axiosError.response.data;
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
          "Sorry, an error occured. Please try again or contact us if problem persists."
        );
        return axiosError.response.data;
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
        return axiosError.response.data;
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
            "Sorry, an error occured. Please try again or contact us if problem persists."
          );
          return axiosError.response.data;
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
        console.log("Error :: delete family", axiosError.response);
        return axiosError.response.data;
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
              <div className="generations-wrapper" key={gen.position}>
                <div className="generation-head">
                  <p>Génération : {gen.position}</p>
                  <button
                    className="delete-btn"
                    onClick={() => deleteGeneration(gen.id)}
                  >
                    <img src={deletePic} alt="delete button" />
                  </button>
                </div>
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
              </div>
            );
          })}
      </>
    );
  };

  return (
    <Main pageTitle="Family">
      <button className="btn-primary back-btn" onClick={() => history.goBack()}>
        {`< Back`}
      </button>
      {renderGenerations()}
      <Container fluid className="generations-wrapper">
        <button
          className="generation-head-new"
          onClick={() => setModalGeneration(true)}
        >
          <img src={addYellow} alt="" />
          <p>New Generation</p>
        </button>
      </Container>

      <ModalForm
        title="Generation"
        show={modalGenerationShow}
        inputs={[
          {
            name: "position",
            placeholder: "Enter the generation's position",
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
