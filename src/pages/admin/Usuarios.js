import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
  DeleteUser,
  AddHerramientasUser,
  TableHerramientasUser,
} from "../../components/Admin";
import { useTaller, useTallerUser } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function Usuarios() {
  const { taller, getTaller } = useTaller();
  const { getUsersTaller, tallerUser, loading } = useTallerUser();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [refetch, setRefecht] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  useEffect(() => {
    getUsersTaller();
  }, [refetch]);
  const openCloseModal = () => setShowModal((prevState) => !prevState);
  const onRefetch = () => setRefecht((prevState) => !prevState);
  const addUser = () => {
    setTitleModal("NUEVO USUARIO");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        talle={taller}
      />
    );
    openCloseModal();
  };
  const updateUser = (data) => {
    setTitleModal("EDITAR USUARIO");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
        talle={taller}
      />
    );
    openCloseModal();
  };
  const onDeleteUser = async (data) => {
    setTitleModal("ELIMINAR USUARIO");
    setContentModal(
      <DeleteUser onClose={openCloseModal} onRefetch={onRefetch} user={data} />
    );
    openCloseModal();
  };
  const showHerramientasUser = async (data) => {
    setTitleModal("Herramientas del ususario");
    setContentModal(
      <TableHerramientasUser
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };
  const addHerramientasUser = async (data) => {
    setTitleModal("Agregar herramientas al ususario");
    setContentModal(
      <AddHerramientasUser
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };
  return (
    <div>
      <HeaderPage
        title="USUARIOS"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <TableUsers
          users={tallerUser}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
          showHerramientasUser={showHerramientasUser}
          addHerramientasUser={addHerramientasUser}
        />
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
