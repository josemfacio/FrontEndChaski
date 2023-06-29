import React, { useState, useEffect } from "react";
import { HeaderPageUser, CardsAlmacen } from "../../components/Admin";
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
  return (
    <>
      <HeaderPageUser title="Almacen" />
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
      {loading && <Loader active inline="centered" />}
      {almacen && (
        <CardsAlmacen almacen={almacen} setSerch={setSerch} loading={loading} />
      )}
    </>
  );
}
