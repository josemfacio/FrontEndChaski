import React from "react";
import { Table, Button, Icon, Image } from "semantic-ui-react";
import image from "../../../../img/NoIMG.jpeg";
import { map } from "lodash";

import "./TableLimite.scss";

export function TableLimit(props) {
  const { limite, editLimit, setSerch, onRefetch } = props;
  return (
    <Table className="table-limit">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
          <Table.HeaderCell>CODIGO</Table.HeaderCell>
          <Table.HeaderCell>IMAGEN</Table.HeaderCell>
          <Table.HeaderCell>ALMACEN</Table.HeaderCell>
          <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
          <Table.HeaderCell>TALLER</Table.HeaderCell>
          <Table.HeaderCell>ACCIONES</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(limite, (limi, index) => (
          <Table.Row key={index}>
            <Table.Cell>{limi.almacen_data.descripcion}</Table.Cell>
            <Table.Cell>{limi.almacen_data.material}</Table.Cell>
            <Table.Cell className="status">
              {!limi.almacen_data.image ? (
                <Image src={image} />
              ) : (
                <Image src={limi.almacen_data.image} />
              )}
            </Table.Cell>
            <Table.Cell>{limi.almacen_data.almacen}</Table.Cell>
            <Table.Cell>{limi.cantidad}</Table.Cell>
            <Table.Cell>{limi.taller_data.nombre}</Table.Cell>
            <Actions limi={limi} editLimit={editLimit} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { limi, editLimit } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon color="yellow" onClick={() => editLimit(limi)}>
        <Icon name="pencil" />
      </Button>
    </Table.Cell>
  );
}
