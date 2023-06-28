import React, { useState, useEffect } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { chunk } from "lodash";
import "./Mispedidos.scss";

export function MisPedidosTable(props) {
  const [activePage, setActivePage] = useState(1);
  const { pedidos, detallePedido } = props;
  const IconConstants = {
    ACTIVO: () => <Icon name="check" />,
    INACTIVO: () => <Icon name="close" />,
  };
  const chunkedData = chunk(pedidos, 100);
  return (
    <>
      {pedidos.length === 0 ? (
        <h1>USUARIO SIN PEDIDOS</h1>
      ) : (
        <Table className="table-almacen-admin">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>CODIGO</Table.HeaderCell>
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
                  <Table.Cell>{item.fecha}</Table.Cell>
                  <Table.Cell className="status">
                    {item.estado ? (
                      <IconConstants.ACTIVO />
                    ) : (
                      <IconConstants.INACTIVO />
                    )}
                  </Table.Cell>

                  <Actions pedido={item} detallePedido={detallePedido} />
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>SIN ELEMENTOS QUE MOSTRAR</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </>
  );
}
function Actions(props) {
  const { pedido, detallePedido } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon color="yellow" onClick={() => detallePedido(pedido)}>
        <Icon name="book" />
      </Button>
    </Table.Cell>
  );
}
