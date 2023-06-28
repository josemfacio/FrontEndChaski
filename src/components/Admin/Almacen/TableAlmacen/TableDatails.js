import React from "react";
import { Table, Icon, Image, Button } from "semantic-ui-react";
import { chunk } from "lodash";
import image from "../../../../img/NoIMG.jpeg";
import "./TableAlmacen.scss";

export default function TableDatails(props) {
  const { almacen, updateAlmacen, delteAlmacen, activePage } = props;
  const IconConstants = {
    ACTIVO: () => <Icon name="check" />,
    INACTIVO: () => <Icon name="close" />,
  };
  const chunkedData = chunk(almacen, 100);
  if (!almacen) return null;
  return (
    <>
      {chunkedData !== null && chunkedData.length !== 0 ? (
        chunkedData[activePage - 1].map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.material}</Table.Cell>
            <Table.Cell>{item.descripcion}</Table.Cell>
            <Table.Cell>{item.cantidad}</Table.Cell>
            <Table.Cell>{item.unidad}</Table.Cell>
            <Table.Cell>{item.almacen}</Table.Cell>
            <Table.Cell className="status">
              {item.estado ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Table.Cell>{item.coste}</Table.Cell>
            <Table.Cell>{item.ubicacion}</Table.Cell>
            <Table.Cell>{item.maquina}</Table.Cell>
            <Table.Cell className="status">
              {!item.image ? <Image src={image} /> : <Image src={item.image} />}
            </Table.Cell>
            <Actions
              almacen={item}
              updateAlmacen={updateAlmacen}
              delteAlmacen={delteAlmacen}
            />
          </Table.Row>
        ))
      ) : (
        <Table.Row>
          <Table.Cell>SIN ELEMENTOS QUE MOSTRAR</Table.Cell>
        </Table.Row>
      )}
    </>
  );
}
function Actions(props) {
  const { almacen, updateAlmacen, delteAlmacen } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon color="yellow" onClick={() => updateAlmacen(almacen)}>
        <Icon name="pencil" />
      </Button>
      {/* <Button icon negative onClick={() => delteAlmacen(almacen)}>
        <Icon name="close" />
      </Button> */}
    </Table.Cell>
  );
}
