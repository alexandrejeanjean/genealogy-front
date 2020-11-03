import React from "react";

import ListWrapper from "../../SharedComponents/ListWrapper/ListWrapper";
import CreateItemBtn from "../../SharedComponents/CreateItemBtn/CreateItemBtn";
import ModalForm from "../../SharedComponents/ModalForm/ModalForm";
import { family } from "../../assets/imgPath";

type TFamily = {
  id: number;
  name: string;
};

type TGetFamilies = TFamily[];

type TDashboardView = {
  list: TGetFamilies;
  goTo: Function;
  deleteFamily: Function;
  setModalShow: Function;
  modalShow: boolean;
  createFamily: Function;
};

const DashboardView = ({
  list,
  goTo,
  deleteFamily,
  setModalShow,
  modalShow,
  createFamily,
}: TDashboardView) => {
  return (
    <>
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
    </>
  );
};

export default DashboardView;
