import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { withToast } from "../../store/ToastProvider";

import {
  apiGetFamilies,
  apiCreateFamily,
  apiDeleteFamily,
} from "./families.api";

import Main from "../Theme/index.view";
import DashboardView from "./dashboard.view";

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
    apiGetFamilies(setToastVisible)
      .then((res) => setList(res))
      .catch((err) => console.log(err));
  }, [setToastVisible]);

  // Get datas on component did mount --------------------------
  useEffect(() => {
    getFamilies();
  }, [getFamilies]);

  // Add family  ---------------------------------------
  const createFamily = async (family: { name: string }) => {
    apiCreateFamily(setToastVisible, family)
      .then(() => getFamilies())
      .catch((err) => console.log(err));
  };

  // Delete family  ---------------------------------------
  const deleteFamily = async (family: TFamily) => {
    const familyId: number = family.id;
    apiDeleteFamily(setToastVisible, familyId)
      .then(() => getFamilies())
      .catch((err) => console.log(err));
  };

  const goTo = (familyId: number) => {
    return history.push({
      pathname: "/family",
      state: { datas: familyId },
    });
  };

  return (
    <Main pageTitle="Dashboard">
      {console.log("LIST ::", list)}
      <DashboardView
        list={list}
        goTo={(familyId: number) => goTo(familyId)}
        deleteFamily={(family: TFamily) => deleteFamily(family)}
        setModalShow={(value: boolean) => setModalShow(value)}
        modalShow={modalShow}
        createFamily={createFamily}
      />
    </Main>
  );
};

export default withToast(Dashboard);
