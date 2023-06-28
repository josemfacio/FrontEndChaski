import React, { useEffect } from "react";
import { usePedidos, useAlmacen } from "../../../../hooks";
import { toast } from "react-toastify";
import { Loader, Table, Button, Icon, Pagination } from "semantic-ui-react";
export function InfoPedidos(props) {
  const { getSerchPedidoID, pedidos, loading, editPedidos } = usePedidos();
  const { editAlmacenPed } = useAlmacen();
  const { data, onRefetch, openCloseModal } = props;
  useEffect(() => {
    getSerchPedidoID(data.id);
  }, []);
  const entrgado = async () => {
    for await (const pedido of pedidos) {
      console.log(pedido);
      const updatedAlmacen = {
        ...pedido.almacen_data,
        cantidad: pedido.almacen_data.cantidad - pedido.cantidad,
      };
      const res = await editAlmacenPed(pedido.idInventario, updatedAlmacen);
    }
    const res2 = await editPedidos(data.id, data);
    toast.success("PEDIDO ENTREGADO Y BD ACTUALIZADA");
    openCloseModal();
    onRefetch();
  };
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
      {!data.estado && (
        <Button
          type="submit"
          primary
          fluid
          content={"ENTERGADO"}
          loading={loading}
          disabled={loading}
          onClick={entrgado}
        />
      )}
    </>
  );
}
