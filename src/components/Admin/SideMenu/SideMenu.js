import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks";
import "./SideMenu.scss";

export function SideMenu(props) {
  const { children } = props;

  const { pathname } = useLocation();
  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} className="left" />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  const [menuVisible, setMenuVisible] = useState(false);
  const { auth } = useAuth();
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <Menu
        fixed="left"
        borderless
        className={`side ${menuVisible ? "visible" : ""}`}
        vertical
      >
        {auth.me?.is_staff ? (
          <>
            <Menu.Item
              as={Link}
              to={"/admin/almacen"}
              active={pathname === "/admin/almacen" ? true : false}
            >
              <Icon name="columns" />
              ALMACEN Admin
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/almacenusers"}
              active={pathname === "/admin/almacenusers" ? true : false}
            >
              <Icon name="archive" />
              AlMACEN Usuarios
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/users"}
              active={pathname === "/admin/users" ? true : false}
            >
              <Icon name="users" />
              USUARIOS
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/taller"}
              active={pathname === "/admin/taller" ? true : false}
            >
              <Icon name="address book outline" />
              TALLER
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/limite"}
              active={pathname === "/admin/limite" ? true : false}
            >
              <Icon name="stop circle outline" />
              LIMITE
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/mrp"}
              active={pathname === "/admin/mrp" ? true : false}
            >
              <Icon name="briefcase" />
              MRP
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/muletos"}
              active={pathname === "/admin/muletos" ? true : false}
            >
              <Icon name="briefcase" />
              MULETOS
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/herramientas"}
              active={pathname === "/admin/herramietnass" ? true : false}
            >
              <Icon name="briefcase" />
              HERRAMIENTAS
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/"}
              active={pathname === "/admin/" ? true : false}
            >
              <Icon name="shop" />
              Pedidos
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              as={Link}
              to={"/admin/almacenusers"}
              active={pathname === "/admin/almacenusers" ? true : false}
            >
              <Icon name="users" />
              ALMACEN CENTRAL
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/miTaller"}
              active={pathname === "/admin/miTaller" ? true : false}
            >
              <Icon name="briefcase" />
              MI TALLER
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/muletos"}
              active={pathname === "/admin/muletos" ? true : false}
            >
              <Icon name="briefcase" />
              MULETOS
            </Menu.Item>

            <Menu.Item
              as={Link}
              to={"/admin/herramientas"}
              active={pathname === "/admin/herramietnass" ? true : false}
            >
              <Icon name="briefcase" />
              HERRAMIENTAS
            </Menu.Item>
            <Menu.Item onClick={toggleMenu}>
              <Icon name="columns" />
              Menu
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/admin/misPedidos"}
              active={pathname === "/admin/misPedidos" ? true : false}
            >
              <Icon name="shop" />
              Pedidos
            </Menu.Item>
          </>
        )}
      </Menu>
      <button className="menu-toggle" onClick={toggleMenu}>
        Toggle Menu
      </button>
    </>
  );
}
