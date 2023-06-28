import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditTaller,
  HeaderPage,
  TableTaller,
  HistorialTaller,
  ReporteTaller,
  AlertasTaller,
  AddMaterialTaller,
  AddEditProductForm,
  TableData,
} from "../../components/Admin";
import { useTaller, useAlmacen } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function Taller() {
  const { getTaller, loading, taller, getTallerExcel } = useTaller();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);

  const addTaller = () => {
    setTitleModal("NUEVO TALLER");
    setContentModal(
      <AddEditTaller onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };
  const addMaterialTaller = (data) => {
    setTitleModal("AUMENTAR STOCK DEL TALLER");
    setContentModal(
      <AddMaterialTaller
        onClose={openCloseModal}
        onRefetch={onRefetch}
        taller={data}
      />
    );
    openCloseModal();
  };
  const updateTaller = (data) => {
    setTitleModal("EDITAR TALLER");
    setContentModal(
      <AddEditTaller
        onClose={openCloseModal}
        onRefetch={onRefetch}
        taller={data}
      />
    );
    openCloseModal();
  };
  const historyTaller = (data) => {
    setTitleModal("HISTORIAL TALLER");
    setContentModal(<HistorialTaller data={data} />);
    openCloseModal();
  };
  const reportWeekTaller = (data) => {
    setTitleModal("REPORTES TALLER");
    setContentModal(<ReporteTaller data={data} />);
    openCloseModal();
  };
  const alertTaller = (data) => {
    setTitleModal("ALERTAS TALLER");
    setContentModal(<AlertasTaller data={data} />);
    openCloseModal();
  };
  const addEditProduct = (data) => {
    setTitleModal("AGREGAR PRODUCTO CONSUMIBLE");
    setContentModal(
      <AddEditProductForm
        data={data}
        onRefetch={onRefetch}
        onClose={openCloseModal}
      />
    );
    openCloseModal();
  };
  const TalleLimiMate = (data) => {
    setTitleModal("DATOS DEL TALLER");
    setContentModal(<TableData data={data} />);
    openCloseModal();
  };
  useEffect(() => {
    getTaller();
  }, [refetch]);

  return (
    <>
      <HeaderPage
        title="Taller"
        btnTitle="Nuevo Taller"
        btnClick={addTaller}
        btnTitleTwo="DESCARGAR"
        btnClickTwo={getTallerExcel}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTaller
          taller={taller}
          updateTaller={updateTaller}
          historyTaller={historyTaller}
          reportWeekTaller={reportWeekTaller}
          alertTaller={alertTaller}
          addMaterialTaller={addMaterialTaller}
          addEditProduct={addEditProduct}
          TalleLimiMate={TalleLimiMate}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
