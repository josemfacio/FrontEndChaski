import React, { useState, useEffect } from "react";
import { Table, Button, Icon, Loader } from "semantic-ui-react";
import { useTallerInfo, useLimite } from "../../../../hooks";
import { map } from "lodash";
import "./TableTaller.scss";
export function TableTaller(props) {
  const {
    taller,
    updateTaller,
    historyTaller,
    reportWeekTaller,
    alertTaller,
    setAlert,
    addMaterialTaller,
    addEditProduct,
    TalleLimiMate,
  } = props;
  return (
    <Table className="table-taller-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>NOMBRE DE TALLER</Table.HeaderCell>
          <Table.HeaderCell>ACCIONES</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(taller, (talle, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <a onClick={() => TalleLimiMate(talle.id)}>{talle.nombre}</a>
            </Table.Cell>
            <Actions
              taller={talle}
              updateTaller={updateTaller}
              addEditProduct={addEditProduct}
              reportWeekTaller={reportWeekTaller}
              alertTaller={alertTaller}
              alert={alert}
              setAlert={setAlert}
              addMaterialTaller={addMaterialTaller}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
function Actions(props) {
  const {
    taller,
    updateTaller,
    addEditProduct,
    reportWeekTaller,
    alertTaller,
    addMaterialTaller,
  } = props;
  const { getSerchTalleInfo, talleInfo, getSerchLimiteTalleCant, loading } =
    useTallerInfo();
  useEffect(() => {
    getSerchLimiteTalleCant(taller.id);
  }, []);
  if (!talleInfo) return;
  return (
    <>
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <>
          <Table.Cell textAlign="right">
            <Button icon color="blue" onClick={() => addEditProduct(taller)}>
              <Icon name="redo" />
            </Button>
            <Button icon color="yellow" onClick={() => updateTaller(taller)}>
              <Icon name="pencil" />
            </Button>
            <Button icon color="teal" onClick={() => addMaterialTaller(taller)}>
              <Icon name="plus" />
            </Button>
            <Button icon color="olive" onClick={() => reportWeekTaller(taller)}>
              <Icon name="calendar" />
            </Button>
            <Button icon color="blue" onClick={() => alertTaller(taller)}>
              {talleInfo.length > 0 ? (
                <span className="circulo-rojo">{talleInfo.length}</span>
              ) : (
                <></>
              )}

              <Icon name="info circle" />
            </Button>
          </Table.Cell>
        </>
      )}
    </>
  );
}
