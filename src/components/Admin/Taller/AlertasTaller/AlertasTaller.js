import React, { useEffect, useState } from "react";
import "./AlertasTaller.scss";
import { useTallerInfo, useLimite } from "../../../../hooks";
import { Table, Button } from "semantic-ui-react";
import { map } from "lodash";
export function AlertasTaller(props) {
  const { data } = props;
  const { talleInfo, getSerchLimiteTalleCant } = useTallerInfo();
  const { getSerchLimiteTalle, limite } = useLimite();

  useEffect(() => {
    getSerchLimiteTalleCant(data.id);
  }, []);
  useEffect(() => {
    getSerchLimiteTalle(data.id);
  }, []);
  if (!talleInfo || !limite) return null;
  return (
    <div>
      <Table className="table-repo-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SAP</Table.HeaderCell>
            <Table.HeaderCell>DESCRIPCIÓN</Table.HeaderCell>
            <Table.HeaderCell>ACTUAL</Table.HeaderCell>
            <Table.HeaderCell>MINIMA</Table.HeaderCell>
            <Table.HeaderCell>STOCK</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {talleInfo.map((talle) => {
            return (
              <Table.Row key={talle.id}>
                <Table.Cell>{talle.almacen_data.material}</Table.Cell>
                <Table.Cell>{talle.almacen_data.descripcion}</Table.Cell>
                <Table.Cell>{talle.cantidad}</Table.Cell>
                {limite.map((limi, index) => {
                  if (limi.idProd === talle.idProd) {
                    return (
                      <Table.Cell error key={index}>
                        {limi.cantidad}
                      </Table.Cell>
                    );
                  }
                })}
                {limite.map((limi) => {
                  if (limi.idProd === talle.idProd) {
                    if (limi.cantidad > talle.almacen_data.cantidad) {
                      return (
                        <Table.Cell error key={`${talle.id}-error`}>
                          {talle.almacen_data.cantidad}
                        </Table.Cell>
                      );
                    } else {
                      return (
                        <Table.Cell positive key={`${talle.id}-positive`}>
                          {talle.almacen_data.cantidad}
                        </Table.Cell>
                      );
                    }
                  }
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
