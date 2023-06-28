import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  AddEditMuletosForm,
  TableMuletos,
} from "../../components/Admin";

import { ModalBasic } from "../../components/Common";
import { useMuletos, useAuth, useUserTalle } from "../../hooks";
export function Muletos(props) {
  const { getSerchMuletos, muletos, loading, error } = useMuletos();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [serch, setSerch] = useState(null);
  const { auth } = useAuth();
  const { getSerchUserTaller, userTaller } = useUserTalle();

  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);

  const addMuleto = () => {
    setTitleModal("NUEVO MULETO");
    setContentModal(
      <AddEditMuletosForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };
  const updateMuleto = (data) => {
    setTitleModal("EDITAR MULETOS");
    setContentModal(
      <AddEditMuletosForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        muletos={data}
      />
    );
    openCloseModal();
  };
  const getMuletos = async () => {
    const res = await getSerchUserTaller(auth.me.id);
    const idTaller = res?.[0]?.idTaller ?? "";
    await getSerchMuletos(idTaller);
  };
  useEffect(() => {
    if (auth.me.is_staff) {
      getSerchMuletos("");
    } else {
      getMuletos();
    }
  }, [refetch, serch]);
  if (!muletos) return null;

  return (
    <div>
      {auth.me.is_staff && (
        <HeaderPage
          title="MULETOS"
          btnTitle="NUEVO MULETO"
          btnClick={addMuleto}
        />
      )}

      {loading ? <Loader active inline="centered" /> : ""}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {muletos && (
        <TableMuletos
          muletos={muletos}
          setSerch={setSerch}
          onRefetch={onRefetch}
          updateMuleto={updateMuleto}
        />
      )}
    </div>
  );
}
