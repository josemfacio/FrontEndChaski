import React from "react";
import { Card, Icon } from "semantic-ui-react";

import "./PedidosCard.scss";
import { TablePed } from "./Table";
export function PedidosCard(props) {
  const { pedidos, detallePedido } = props;
  return (
    <>
      {/* <div className="cards-pedidos">
        <Card.Group itemsPerRow={4}>
          <Card>
            <Card.Content>
              <Card.Header>TALLER ELECTRICO</Card.Header>

              <Card.Description>
                <Icon name="plug" />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>TALLER MECANICO</Card.Header>

              <Card.Description>
                <Icon name="cog" />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>TALLER ENVASADO</Card.Header>

              <Card.Description>
                <Icon name="glass martini" />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>TALLER DE SERVICIOS</Card.Header>

              <Card.Description>
                <Icon name="beer" />
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div> */}
      <TablePed pedidos={pedidos} detallePedido={detallePedido} />
    </>
  );
}
