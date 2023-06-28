import React, { useEffect } from "react";
import { usePedidos } from "../../../../hooks";
import { Loader, Table } from "semantic-ui-react";
export function InfoMisPedidos(props) {
  const { getSerchPedidoID, pedidos, loading } = usePedidos();
  const { data } = props;
  useEffect(() => {
    getSerchPedidoID(data.id);
  }, []);
  return (
    <>
      {loading || !pedidos ? (
        <Loader active inline="centered" />
      ) : (
        <Table className="table-almacen-admin sortable">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>SAP</Table.HeaderCell>
              <Table.HeaderCell>DESCRIPCION</Table.HeaderCell>
              <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
              <Table.HeaderCell>OT</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pedidos.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.almacen_data.material}</Table.Cell>
                <Table.Cell>{item.almacen_data.descripcion}</Table.Cell>
                <Table.Cell>{item.cantidad}</Table.Cell>
                <Table.Cell>{item.ot}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}
