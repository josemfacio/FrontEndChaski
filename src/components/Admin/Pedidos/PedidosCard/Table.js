import React, { useState, useEffect, useCallback } from "react";
import { Table, Icon, Button, Pagination } from "semantic-ui-react";
import { chunk } from "lodash";
import _ from "lodash";

export function TablePed(props) {
  const { pedidos, detallePedido } = props;

  const [activePage, setActivePage] = useState(1);
  const IconConstants = {
    ACTIVO: () => <Icon name="check" />,
    INACTIVO: () => <Icon name="close" />,
  };
  const chunkedData = chunk(pedidos, 100);
  if (!pedidos) return;
  return (
    <div className="table-almacen-admin">
      <Pagination
        totalPages={Math.ceil(pedidos.length / 100)}
        activePage={activePage}
        pointing
        onPageChange={(e, { activePage }) => setActivePage(activePage)}
      />
      <Table className="table-almacen-admin sortable">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>COD</Table.HeaderCell>
            <Table.HeaderCell>LEGAJO</Table.HeaderCell>
            <Table.HeaderCell>NOMBRE Y APELLIDO</Table.HeaderCell>
            <Table.HeaderCell>FECHA</Table.HeaderCell>
            <Table.HeaderCell>ESTADO</Table.HeaderCell>
            <Table.HeaderCell>DETALLES</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {chunkedData !== null && chunkedData.length !== 0 ? (
            chunkedData[activePage - 1].map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.userData.username}</Table.Cell>
                <Table.Cell>
                  {item.userData.first_name + " " + item.userData.last_name}
                </Table.Cell>
                <Table.Cell>
                  {(() => {
                    const fecha = new Date(item.fecha);
                    return fecha.toLocaleString();
                  })()}
                </Table.Cell>
                <Table.Cell className="status">
                  {item.estado ? (
                    <IconConstants.ACTIVO />
                  ) : (
                    <IconConstants.INACTIVO />
                  )}
                </Table.Cell>
                <Actions id={item} detallePedido={detallePedido} />
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>SIN ELEMENTOS QUE MOSTRAR</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

function Actions(props) {
  const { id, detallePedido } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon color="yellow" onClick={() => detallePedido(id)}>
        <Icon name="book" />
      </Button>
    </Table.Cell>
  );
}
