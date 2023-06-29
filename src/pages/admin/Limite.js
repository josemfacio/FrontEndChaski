import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditLimitForm,
  HeaderPage,
  TableLimit,
} from "../../components/Admin";

import { ModalBasic } from "../../components/Common";
import { useLimite, useTaller } from "../../hooks";
export function Limite() {
  const { limite, loading, error, getSerchLimiteTalle } = useLimite();
  const { getTaller, taller } = useTaller();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [serch, setSerch] = useState(null);
  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);

  const addLimite = () => {
    setTitleModal("NUEVO LIMITE");
    setContentModal(
      <AddEditLimitForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };
  const updateLimite = (data) => {
    setTitleModal("EDITAR LIMITE");
    setContentModal(
      <AddEditLimitForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        alma={data}
      />
    );
    openCloseModal();
  };
  useEffect(() => {
    getTaller();
  }, []);
  useEffect(() => {
    getSerchLimiteTalle(serch);
  }, [refetch, serch]);

  return (
    <>
      <HeaderPage
        title="LIMITE"
        btnTitle="NUEVO LIMITE"
        btnClick={addLimite}
        talle={taller}
        setSerch={setSerch}
      />
      {loading ? <Loader active inline="centered" /> : ""}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {limite && (
        <TableLimit
          limite={limite}
          editLimit={updateLimite}
          onRefetch={onRefetch}
          setSerch={setSerch}
        />
      )}
    </>
  );
}
