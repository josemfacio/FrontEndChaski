import React, { useEffect, useState } from "react";
import { PedidosCard, InfoPedidos } from "../../components/Admin";
import { usePedidos } from "../../hooks";
import { ModalBasic } from "../../components/Common";
import { Loader } from "semantic-ui-react";
export function HomeAdmin() {
  const { getPediddo, loading, pedidos } = usePedidos();
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefecht] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefecht((prevState) => !prevState);
  useEffect(() => {
    getPediddo();
  }, [refetch]);
  const detallePedido = (data) => {
    setTitleModal("DETALLES DEL PEDIDO");
    setContentModal(
      <InfoPedidos
        data={data}
        onRefetch={onRefetch}
        openCloseModal={openCloseModal}
      />
    );
    openCloseModal();
  };
  return (
    <div>
      {loading || !pedidos ? (
        <Loader active inline="centered" />
      ) : (
        <PedidosCard pedidos={pedidos} detallePedido={detallePedido} />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </div>
  );
}
