import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditAlmacenForm,
  HeaderPage,
  TableAlmacen,
  DeleteAlmacen,
  AddBD,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useAlmacen } from "../../hooks";

export function Almacen() {
  const { getAlmacen, almacen, loading, getSerchAlmacen } = useAlmacen();
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefecht] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [serch, setSerch] = useState(null);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefecht((prevState) => !prevState);
  useEffect(() => {
    getSerchAlmacen(serch);
  }, [refetch, serch]);
  const addAlmacen = () => {
    setTitleModal("NUEVO PRODUCTO");
    setContentModal(
      <AddEditAlmacenForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };
  const addBD = () => {
    setTitleModal("ACTUALIZAR BD");
    setContentModal(<AddBD onClose={openCloseModal} onRefetch={onRefetch} />);
    openCloseModal();
  };
  const updateAlmacen = (data) => {
    setTitleModal("Editar Almacen");
    setContentModal(
      <AddEditAlmacenForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        almacen={data}
      />
    );
    openCloseModal();
  };
  const delteAlmacen = (data) => {
    setTitleModal("Eliminar Producto");
    setContentModal(
      <DeleteAlmacen
        onClose={openCloseModal}
        onRefetch={onRefetch}
        almacen={data}
      />
    );
    openCloseModal();
  };
  return (
    <>
      <HeaderPage
        title="Almacen"
        btnTitle="Nuevo Producto"
        btnClick={addAlmacen}
        btnTitleTwo="Actualizar BD"
        btnClickTwo={addBD}
      />
      {loading ? <Loader active inline="centered" /> : ""}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {almacen && (
        <TableAlmacen
          almacen={almacen}
          updateAlmacen={updateAlmacen}
          delteAlmacen={delteAlmacen}
          onRefetch={onRefetch}
          setSerch={setSerch}
        />
      )}
    </>
  );
}
