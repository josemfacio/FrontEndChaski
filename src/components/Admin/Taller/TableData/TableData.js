import React, { useEffect } from "react";
import { Table, Button, Icon, Loader } from "semantic-ui-react";
import { useTallerInfo } from "../../../../hooks";
export function TableData(props) {
  const { data } = props;
  const { getSerchDataTalle, talleInfo, loading } = useTallerInfo();
  useEffect(() => {
    getSerchDataTalle(data);
  }, []);
  if (!talleInfo) return null;
  return (
    <>
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <Table celled className="table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>NOMBRE</Table.HeaderCell>
              <Table.HeaderCell>CANTIDAD TALLER</Table.HeaderCell>
              <Table.HeaderCell>CANTIDAD LIMITE</Table.HeaderCell>
              <Table.HeaderCell>CANTIDAD ALMACEN</Table.HeaderCell>
              <Table.HeaderCell>almacen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {talleInfo[0].infoTaller.map((talle, index) => (
              <Table.Row key={index}>
                <Table.Cell>{talle.descripcion}</Table.Cell>
                <Table.Cell>{talle.cantidad_info}</Table.Cell>
                <Table.Cell>{talle.cantidad_limite}</Table.Cell>
                <Table.Cell>{talle.almacen_cantidad}</Table.Cell>
                <Table.Cell>{talle.almacen}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}
