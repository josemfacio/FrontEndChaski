import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Table,
  Image,
  Input,
  Pagination,
  Loader,
} from "semantic-ui-react";
import { chunk, map } from "lodash";
import image from "../../../../img/NoIMG.jpeg";
import { useTallerInfo } from "../../../../hooks";
import { toast } from "react-toastify";
import "./AddMaterialTaller.scss";

export function AddMaterialTaller(props) {
  const { editTalleInfo, getSerchTalleInfo, talleInfo, loading } =
    useTallerInfo();
  const { onClose, onRefetch, taller } = props;
  const [editingIndex, setEditingIndex] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [data, setData] = useState([]);
  const [selec, setSelec] = useState([]);

  useEffect(() => {
    getSerchTalleInfo(taller.id);
  }, []);

  if (!talleInfo) return null;
  const chunkedData = chunk(talleInfo, 10);
  return (
    <>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <Form>
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
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="number"
                        value={
                          selec[talle.idProd]?.cantidad !== undefined
                            ? selec[talle.idProd].cantidad
                            : talle.cantidad
                        }
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
                    {/* <Table.Cell>
                      {map(data, (dat, index) => {
                        data[talle.id] !== undefined && (
                          <Button
                            basic
                            color="green"
                            type="button"
                            onClick={() => {
                              setData((prevData) => {
                                const newData = { ...prevData };
                                newData[talle.id] = talle.id;
                                return newData;
                              });
                              setEditingIndex((prevData) => {
                                const newData = { ...prevData };
                                newData[talle.idProd] = index;
                                return newData;
                              });
                              setSelec((prevData) => {
                                const newData = { ...prevData };
                                newData[talle.idProd] = {
                                  ...newData[talle.idProd],
                                  idProd: talle.idProd,
                                  cantidad: talle.cantidad,
                                  id: talle.id,
                                  idTaller: taller.id,
                                };
                                return newData;
                              });
                            }}
                          >
                            Si
                          </Button>
                        );
                        if (dat === talle.id) {
                          return (
                            <Button
                              basic
                              color="red"
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
                              key={index}
                            >
                              NO
                            </Button>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Table.Cell> */}
                  </Table.Row>
                ))
              ) : (
                <tr>
                  <th>SIN ELEMENTOS QUE MOSTRAR</th>
                </tr>
              )}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Pagination
                    totalPages={Math.ceil(talleInfo.length / 10)}
                    activePage={activePage}
                    onPageChange={(e, { activePage }) =>
                      setActivePage(activePage)
                    }
                  />
                  <Button
                    primary
                    fluid
                    content={"Actualizar"}
                    onClick={() => {
                      try {
                        Object.keys(selec).map(async (repo) => {
                          selec[repo] = {
                            ...selec[repo],
                            idTaller: taller.id,
                          };
                          await editTalleInfo(selec[repo]);
                        });
                        toast.success("REPORTE CREADO CORRECTAMENTE");
                        onRefetch();
                        onClose();
                      } catch (error) {
                        toast.error("Error");
                        console.log(error);
                      }
                    }}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Form>
      )}
    </>
  );
}
