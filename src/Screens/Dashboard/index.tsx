import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Main from "../Theme/index";
import apiClient from "../../api";
import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import family from "../../assets/family.svg";
import "./dashboard.scss";

type TFamily = {
  id: number;
  name: string;
};

type TGetFamilies = TFamily[];

const Dashboard = () => {
  const [list, setList] = useState<TGetFamilies>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  // Get family datas ---------------------------------------
  const getFamilies = async () => {
    try {
      const response = await apiClient.get("/families");
      const families = response.data;
      if (families) {
        setList(families);
      }
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: get families", axiosError.response);
        return axiosError.response.data;
      }

      throw err;
    }
  };

  // Get datas on component did mount --------------------------
  useEffect(() => {
    getFamilies();
  }, []);

  // Add family  ---------------------------------------
  const createFamily = async (family: { name: string }) => {
    try {
      const response = await apiClient.post(`/families`, { name: family.name });
      if (response) getFamilies();
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: create family", axiosError.response);
        setErrorMsg(
          "Sorry, an error occured. Please try again or contact us if problem persists."
        );
        return axiosError.response.data;
      }
      throw err;
    }
  };

  // Delete family  ---------------------------------------
  const deleteFamily = async (family: TFamily) => {
    const familyId: number = family.id;
    try {
      const response = await apiClient.delete(`/families/${familyId}`);
      if (response) getFamilies();
    } catch (err) {
      if (err && err.response) {
        const axiosError = err;
        console.log("Error :: delete family", axiosError.response);
        return axiosError.response.data;
      }
      throw err;
    }
  };

  const goTo = (familyId: number) => {
    return history.push({
      pathname: "/family",
      state: { datas: familyId },
    });
  };

  return (
    <Main pageTitle="Dashboard">
      <section>
        <ListWrapper
          datas={list}
          getAvatar={() => family}
          handleClick={(familyId: number) => goTo(familyId)}
          handleDelete={(family: TFamily) => deleteFamily(family)}
        >
          <CreateItemBtn handleClick={() => setModalShow(true)} />
        </ListWrapper>

        <ModalForm
          title="Family"
          show={modalShow}
          inputs={[
            { name: "name", placeholder: "Ex: Armstrong", inputType: "text" },
          ]}
          onHide={() => setModalShow(false)}
          handleSubmit={createFamily}
          errorMsg={errorMsg}
        />
        {errorMsg && <p className="error-text ml-5">{errorMsg}</p>}
      </section>
    </Main>
  );
};

export default Dashboard;
