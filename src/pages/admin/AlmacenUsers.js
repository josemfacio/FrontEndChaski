import React, { useState, useEffect } from "react";
import {
  HeaderPageUser,
  CardsAlmacen,
  AddEditMrpForm,
} from "../../components/Admin";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common";
import { useAlmacen } from "../../hooks";
export function AlmacenUsers() {
  const [showModal, setShowModal] = useState(false);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [serch, setSerch] = useState(null);
  const { almacen, loading, getSerchAlmacen } = useAlmacen();
  const onRefetch = () => setRefecht((prevState) => !prevState);
  useEffect(() => {
    getSerchAlmacen(serch);
  }, [serch, refetch]);
  const addSolicitud = (data) => {
    setTitleModal("NUEVA SOLICITUD");
    setContentModal(
      <AddEditMrpForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        data={data}
      />
    );
    openCloseModal();
  };
  return (
    <>
      <HeaderPageUser title="Almacen" />
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {almacen && (
        <CardsAlmacen
          almacen={almacen}
          setSerch={setSerch}
          loading={loading}
          addSolicitud={addSolicitud}
        />
      )}
    </>
  );
}
