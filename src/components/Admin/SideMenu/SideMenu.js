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
              to={"/almacen"}
              active={pathname === "/almacen" ? true : false}
            >
              <Icon name="columns" />
              ALMACEN Admin
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/almacenusers"}
              active={pathname === "/almacenusers" ? true : false}
            >
              <Icon name="archive" />
              AlMACEN Usuarios
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/users"}
              active={pathname === "/users" ? true : false}
            >
              <Icon name="users" />
              USUARIOS
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/taller"}
              active={pathname === "/taller" ? true : false}
            >
              <Icon name="address book outline" />
              TALLER
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/limite"}
              active={pathname === "/limite" ? true : false}
            >
              <Icon name="stop circle outline" />
              LIMITE
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/mrp"}
              active={pathname === "/mrp" ? true : false}
            >
              <Icon name="briefcase" />
              MRP
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/muletos"}
              active={pathname === "/muletos" ? true : false}
            >
              <Icon name="briefcase" />
              MULETOS
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/herramientas"}
              active={pathname === "/herramietnass" ? true : false}
            >
              <Icon name="briefcase" />
              HERRAMIENTAS
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/"}
              active={pathname === "/" ? true : false}
            >
              <Icon name="shop" />
              Pedidos
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item
              as={Link}
              to={"/almacenusers"}
              active={pathname === "/almacenusers" ? true : false}
            >
              <Icon name="users" />
              ALMACEN CENTRAL
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/miTaller"}
              active={pathname === "/miTaller" ? true : false}
            >
              <Icon name="briefcase" />
              MI TALLER
            </Menu.Item>
            <Menu.Item
              as={Link}
              to={"/muletos"}
              active={pathname === "/muletos" ? true : false}
            >
              <Icon name="briefcase" />
              MULETOS
            </Menu.Item>

            <Menu.Item
              as={Link}
              to={"/herramientas"}
              active={pathname === "/herramietnass" ? true : false}
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
              to={"/misPedidos"}
              active={pathname === "/misPedidos" ? true : false}
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
