import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { withToast } from "../../store/ToastProvider";
import { ErrorHandler } from "../../helpers";

import apiClient from "../../api";

import Main from "../Theme/index";
import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import { family } from "../../assets/imgPath";
import "./dashboard.scss";

type TFamily = {
  id: number;
  name: string;
};

type TGetFamilies = TFamily[];

type TDashboard = {
  setToastVisible: Function;
};

const Dashboard = ({ setToastVisible }: TDashboard) => {
  const [list, setList] = useState<TGetFamilies>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);

  const history = useHistory();

  const getFamilies = useCallback(async () => {
    try {
      const response = await apiClient.get("/families");
      const families = response.data;
      if (families) {
        setList(families);
      }
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't access to your families.");
    }
  }, [setToastVisible]);

  // Get datas on component did mount --------------------------
  useEffect(() => {
    getFamilies();
  }, [getFamilies]);

  // Add family  ---------------------------------------
  const createFamily = async (family: { name: string }) => {
    try {
      const response = await apiClient.post(`/families`, { name: family.name });
      if (response) getFamilies();
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't create your family.");
    }
  };

  // Delete family  ---------------------------------------
  const deleteFamily = async (family: TFamily) => {
    const familyId: number = family.id;
    try {
      const response = await apiClient.delete(`/families/${familyId}`);
      if (response) getFamilies();
    } catch (err) {
      ErrorHandler(err, setToastVisible, "We can't delete this family.");
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
      </section>
      <ModalForm
        title="Family"
        show={modalShow}
        inputs={[
          { name: "name", placeholder: "Ex: Armstrong", inputType: "text" },
        ]}
        onHide={() => setModalShow(false)}
        submit={createFamily}
      />
    </Main>
  );
};

export default withToast(Dashboard);
