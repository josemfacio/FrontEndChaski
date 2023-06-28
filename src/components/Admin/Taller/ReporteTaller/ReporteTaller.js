import React, { useEffect, useState } from "react";
import { Button, Card, Feed, Icon, Table } from "semantic-ui-react";
import { map, chunk } from "lodash";
import { useReporte } from "../../../../hooks";
import { Paginations } from "../../../Common";
import "./ReporteTaller";

export function ReporteTaller(props) {
  const { data } = props;
  const [activePage, setActivePage] = useState(1);
  const { getSerchReporte, reporte } = useReporte();

  useEffect(() => {
    getSerchReporte(data.id);
  }, []);
  if (!reporte) return null;
  const chunkedData = chunk(reporte, 5);
  return (
    <div>
      <Table className="table-repo-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>FECHA</Table.HeaderCell>
            <Table.HeaderCell>NOMBRE</Table.HeaderCell>
            <Table.HeaderCell>COMENTARIOS</Table.HeaderCell>
            <Table.HeaderCell>ACCIONES</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {chunkedData !== null && chunkedData.length !== 0 ? (
            chunkedData[activePage - 1].map((talle, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  {(() => {
                    const fecha = new Date(talle.fecha);
                    return fecha.toLocaleString();
                  })()}
                </Table.Cell>
                <Table.Cell>{talle.user_data.first_name}</Table.Cell>
                <Table.Cell>{talle.comentario}</Table.Cell>
                <Table.Cell className="status">
                  {talle.alerta ? <Icon name="check" /> : <Icon name="close" />}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <h1>SIN ELEMENTOS QUE MOSTRAR</h1>
          )}
        </Table.Body>
      </Table>
      <Paginations
        cant={reporte.length}
        cant2={5}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
}
