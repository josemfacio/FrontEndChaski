import React, { useState, useEffect } from "react";
import { ModalBasic } from "../../components/Common";
import { AddEditFormReporte } from "../../components/Admin";
import { HeaderPageUser, CardsMiTaller } from "../../components/Admin";
import { useTallerInfo, useAuth } from "../../hooks";
import { Loader } from "semantic-ui-react";
export function MiTaller() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [serch, setSerch] = useState(null);

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);
  const { talleInfo, loading, getSerchTalleinfoData } = useTallerInfo();
  const { auth } = useAuth();

  const addReporte = () => {
    setTitleModal("INVENTARIO");
    setContentModal(
      <AddEditFormReporte
        me={auth.me.id}
        tallerInfo={talleInfo}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };
  useEffect(() => {
    getSerchTalleinfoData(auth.me.id);
  }, [refetch]);

  return (
    <>
      <HeaderPageUser
        title="Mi taller"
        btnTitle="INVENTARIO"
        btnClick={addReporte}
      />
      {loading && <Loader active inline="centered" />}
      {talleInfo && <CardsMiTaller setSerch={setSerch} talleInfo={talleInfo} />}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
