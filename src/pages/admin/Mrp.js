import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, AddEditMrpForm, TableMrp } from "../../components/Admin";

import { ModalBasic } from "../../components/Common";
import { useMrp } from "../../hooks";
export function Mrp() {
  const { addMrp, editMrp, getMrp, mrp, loading, error } = useMrp();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);

  const addLimite = () => {
    setTitleModal("NUEVO PRODUCTO PARA MRP");
    setContentModal(
      <AddEditMrpForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };
  const updateLimite = (data) => {
    setTitleModal("EDITAR MRP");
    setContentModal(
      <AddEditMrpForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        mrp={mrp}
      />
    );
    openCloseModal();
  };
  useEffect(() => {
    getMrp();
  }, []);
  return (
    <>
      <HeaderPage title="MATERIALES SOLICITADOS" />
      {loading ? <Loader active inline="centered" /> : ""}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {mrp && <TableMrp mrp={mrp} />}
    </>
  );
}
