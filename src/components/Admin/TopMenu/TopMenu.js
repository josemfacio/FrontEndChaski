import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import { ModalBasic } from "../../Common/ModalBasic";
import { Link, useLocation } from "react-router-dom";
import { Carrito } from "../";
import "./TopMenu.scss";

export function TopMenu() {
  const [showModal, setShowModal] = useState(false);
  const openCloseModal = () => setShowModal((prev) => !prev);
  const [contentModal, setContentModal] = useState(null);
  const { auth, logout } = useAuth();
  const { pathname } = useLocation();
  const rederName = () => {
    if (auth.me?.first_name && auth.me?.last_name) {
      return `${auth.me.first_name} ${auth.me.last_name}`;
    }
    return auth.me?.email;
  };
  const [titleModal, setTitleModal] = useState(null);
  const getAlmacen = () => {
    setTitleModal("CARRITO");
    setContentModal(<Carrito onClose={openCloseModal} me={auth.me} />);
    openCloseModal();
  };
  return (
    <>
      <Menu fixed="top" className="top-menu-admin">
        <Menu.Item className="top-menu-admin__logo">
          <h3>REPUESTOS</h3>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={getAlmacen}>
            <Icon name="shop" />
          </Menu.Item>
          <Menu.Item>HOLA {rederName()}</Menu.Item>
          <Menu.Item
            onClick={logout}
            as={Link}
            to={"/"}
            active={pathname === "/"}
          >
            <Icon name="sign-out" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
