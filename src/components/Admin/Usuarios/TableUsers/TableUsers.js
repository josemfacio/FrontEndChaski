import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableUsers.scss";

export function TableUsers(props) {
  const {
    users,
    updateUser,
    onDeleteUser,
    showHerramientasUser,
    addHerramientasUser,
  } = props;
  return (
    <Table className="table-users-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Codigo de Usuario</Table.HeaderCell>
          <Table.HeaderCell>NOMBRE COMPLETO</Table.HeaderCell>
          <Table.HeaderCell>ACTIVO</Table.HeaderCell>
          <Table.HeaderCell>ADMINISTRADOR</Table.HeaderCell>
          <Table.HeaderCell>TALLER</Table.HeaderCell>
          <Table.HeaderCell>ACCIONES</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(users, (user, index) => (
          <Table.Row key={index}>
            <Table.Cell>{user.user_data.username}</Table.Cell>
            <Table.Cell>
              {user.user_data.first_name + " " + user.user_data.last_name}
            </Table.Cell>
            <Table.Cell className="status">
              {user.user_data.is_active ? (
                <Icon name="check" />
              ) : (
                <Icon name="close" />
              )}
            </Table.Cell>
            <Table.Cell className="status">
              {user.user_data.is_staff ? (
                <Icon name="check" />
              ) : (
                <Icon name="close" />
              )}
            </Table.Cell>
            <Table.Cell>{user.taller_data.nombre}</Table.Cell>
            <Table.Cell>
              <Actions
                user={user}
                updateUser={updateUser}
                onDeleteUser={onDeleteUser}
                showHerramientasUser={showHerramientasUser}
                addHerramientasUser={addHerramientasUser}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const {
    user,
    updateUser,
    onDeleteUser,
    showHerramientasUser,
    addHerramientasUser,
  } = props;
  return (
    <>
      {/* <Button icon color="violet" onClick={() => showHerramientasUser(user)}>
        <Icon name="cut" />
      </Button>
      <Button icon color="blue" onClick={() => addHerramientasUser(user)}>
        <Icon name="plus" />
      </Button> */}
      <Button icon color="yellow" onClick={() => updateUser(user)}>
        <Icon name="pencil" />
      </Button>
      {/* <Button icon negative onClick={() => onDeleteUser(user)}>
        <Icon name="close" />
      </Button> */}
    </>
  );
}
