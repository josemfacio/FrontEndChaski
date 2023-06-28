import React, { useState, useEffect } from "react";
import { chunk } from "lodash";
import image from "../../../../img/NoIMG.jpeg";
import { Table, Input, Button, Pagination, Image } from "semantic-ui-react";
import { map } from "lodash";
import "./Table.Report.scss";

export function TableReport(props) {
  const { talleInfo, setReportInfo } = props;
  const [editingIndex, setEditingIndex] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [data, setData] = useState([]);
  const [selec, setSelec] = useState([]);
  useEffect(() => {
    setReportInfo(selec);
  }, [selec]);
  const chunkedData = chunk(talleInfo, 10);
  return (
    <Table celled className="table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>NOMBRE</Table.HeaderCell>
          <Table.HeaderCell>IMG</Table.HeaderCell>
          <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
          <Table.HeaderCell>INTERACTUAR</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {chunkedData !== null && chunkedData.length !== 0 ? (
          chunkedData[activePage - 1].map((talle, index) => (
            <Table.Row key={index}>
              <Table.Cell>{talle.almacen_data.descripcion}</Table.Cell>
              <Table.Cell className="status">
                {!talle.almacen_data.image ? (
                  <Image src={image} />
                ) : (
                  <Image src={talle.almacen_data.image} />
                )}
              </Table.Cell>
              <Table.Cell>
                <Input
                  type="number"
                  value={String(
                    selec[talle.idProd]?.cantidad !== undefined
                      ? selec[talle.idProd].cantidad
                      : talle.cantidad
                  )}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  // value={selec[talle.idProd]?.cantidad || talle.cantidad}
                  disabled={!editingIndex.hasOwnProperty(talle.idProd)}
                  onChange={(event) => {
                    const { value } = event.target;
                    setSelec((prevData) => ({
                      ...prevData,
                      [talle.idProd]: {
                        ...prevData[talle.idProd],
                        cantidad: parseInt(value),
                      },
                    }));
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                {data[talle.id] !== undefined && (
                  <Button
                    basic
                    color="green"
                    type="button"
                    onClick={() => {
                      setData((prevData) => {
                        const newData = { ...prevData };
                        delete newData[talle.id];
                        return newData;
                      });
                      setEditingIndex((prevData) => {
                        const newData = { ...prevData };
                        delete newData[talle.idProd];
                        return newData;
                      });
                      setSelec((prevData) => {
                        const newData = { ...prevData };
                        delete newData[talle.idProd];
                        return newData;
                      });
                    }}
                  >
                    SI
                  </Button>
                )}
                {data[talle.id] === undefined && (
                  <Button
                    basic
                    color="red"
                    type="button"
                    onClick={() => {
                      setData((prevData) => ({
                        ...prevData,
                        [talle.id]: talle.id,
                      }));
                      setEditingIndex((prevData) => ({
                        ...prevData,
                        [talle.idProd]: index,
                      }));
                      setSelec((prevData) => ({
                        ...prevData,
                        [talle.idProd]: {
                          ...prevData[talle.idProd],
                          idProd: talle.idProd,
                          cantidad: talle.cantidad || 0,
                          id: talle.id,
                        },
                      }));
                    }}
                  >
                    NO
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <h1>SIN ELEMENTOS QUE MOSTRAR</h1>
        )}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Pagination
              totalPages={Math.ceil(talleInfo.length / 10)}
              activePage={activePage}
              pointing
              onPageChange={(e, { activePage }) => setActivePage(activePage)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
