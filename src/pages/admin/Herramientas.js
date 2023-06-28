import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  AddEditHerramientasForm,
  TableHerramientas,
  CheckList,
} from "../../components/Admin";

import { ModalBasic } from "../../components/Common";
import { useHerramientas, useAuth, useUserTalle } from "../../hooks";
export function Herramientas() {
  const { getSerchHerramientas, herramientas, error, loading } =
    useHerramientas();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [serch, setSerch] = useState(null);
  const { auth } = useAuth();
  const { getSerchUserTaller } = useUserTalle();
  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);
  const addHerramienta = () => {
    setTitleModal("NUEVO PRODUCTO PARA HERRAMIENTAS");
    setContentModal(
      <AddEditHerramientasForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };
  const updateHerramienta = (data) => {
    setTitleModal("EDITAR HERRAMIENTA");
    setContentModal(
      <AddEditHerramientasForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        herramienta={data}
      />
    );
    openCloseModal();
  };
  const newCheckList = (data) => {
    setTitleModal("CHECK-LIST DE INSPECCIÓN HERRAMIENTAS");
    setContentModal(
      <CheckList
        onClose={openCloseModal}
        onRefetch={onRefetch}
        herramienta={data}
        auth={auth.me}
      />
    );
    openCloseModal();
  };
  const getHerramientas = async (id) => {
    const res = await getSerchUserTaller(id);
    await getSerchHerramientas(res[0].idTaller);
  };

  useEffect(() => {
    if (auth.me.is_staff) {
      getSerchHerramientas("");
    } else {
      getHerramientas(auth.me.id);
    }
  }, [refetch, serch]);
  return (
    <div>
      {auth.me.is_staff && (
        <HeaderPage
          title="HERRAMIENTAS"
          btnTitle="NUEVA HERRAMIENTA"
          btnClick={addHerramienta}
        />
      )}

      {loading ? <Loader active inline="centered" /> : ""}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {herramientas && (
        <TableHerramientas
          herramientas={herramientas}
          setSerch={setSerch}
          onRefetch={onRefetch}
          updateHerramienta={updateHerramienta}
          newCheckList={newCheckList}
          auth={auth}
        />
      )}
    </div>
  );
}
