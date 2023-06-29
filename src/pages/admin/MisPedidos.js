import React, { useEffect, useState } from "react";
import {
  MisPedidosTable,
  InfoMisPedidos,
  HeaderPage,
} from "../../components/Admin";
import { usePedidos, useAuth } from "../../hooks";
import { ModalBasic } from "../../components/Common";
import { Loader } from "semantic-ui-react";
export function MisPedidos() {
  const { getSerchPedidoIDUser, pedidos, loading } = usePedidos();
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefecht] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefecht((prevState) => !prevState);
  useEffect(() => {
    getSerchPedidoIDUser(auth.me.id);
  }, []);
  const detallePedido = (data) => {
    setTitleModal("DETALLES DEL PEDIDO");
    setContentModal(
      <InfoMisPedidos
        data={data}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );
    openCloseModal();
  };
  return (
    <>
      <HeaderPage title="PEDIDOS" />
      {loading || !pedidos ? (
        <Loader active inline="centered" />
      ) : (
        <MisPedidosTable pedidos={pedidos} detallePedido={detallePedido} />
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
