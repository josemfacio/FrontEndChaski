import React, { useState, useCallback, useEffect } from "react";
import {
  Table,
  Button,
  Icon,
  Image,
  Pagination,
  Search,
} from "semantic-ui-react";
import { chunk } from "lodash";
import image from "../../../../img/NoIMG.jpeg";
import { Paginations } from "../../../Common";

import _ from "lodash";
import "./TableMuletos.scss";

export function TableMuletos(props) {
  const { muletos, setSerch, onRefetch, updateMuleto } = props;
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const chunkedData = chunk(muletos, 100);
  const handleSearchChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );
  const handleResultSelect = (e, result) => {
    setSearchValue(result.material);
    setIsLoading(true);
    setIsLoading(false);
  };
  useEffect(() => {
    async function fetchData() {
      setSerch(searchValue.toLowerCase());
    }

    fetchData();
  }, [searchValue]);
  if (!muletos) return null;
  console.log(muletos);
  return (
    <div>
      <div className="actions">
        {/* <Search
          category
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 1000, {
            leading: true,
          })}
          loading={isLoading}
          showNoResults={false}
        /> */}
        <Paginations
          cant={muletos.length}
          cant2={100}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      <Table className="table-limit">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>NOMBRE</Table.HeaderCell>
            <Table.HeaderCell>IMAGEN</Table.HeaderCell>
            <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
            <Table.HeaderCell>TALLER</Table.HeaderCell>
            <Table.HeaderCell>MARCA</Table.HeaderCell>
            <Table.HeaderCell>TIPO</Table.HeaderCell>
            <Table.HeaderCell>POTENCIA</Table.HeaderCell>
            <Table.HeaderCell>RPM</Table.HeaderCell>
            <Table.HeaderCell>VOLTAGE</Table.HeaderCell>
            <Table.HeaderCell>CORRIENTE</Table.HeaderCell>
            <Table.HeaderCell>ACCIONES</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {chunkedData !== null && chunkedData.length !== 0 ? (
            chunkedData[activePage - 1].map((limi, index) => (
              <Table.Row
                key={limi.id}
                error={limi.estado === "ES"}
                warning={limi.estado === "RP"}
                positive={limi.estado === "RD"}
              >
                <Table.Cell>{limi.nombre}</Table.Cell>
                <Table.Cell className="status">
                  {!limi.image ? (
                    <Image src={image} />
                  ) : (
                    <Image src={limi.image} />
                  )}
                </Table.Cell>
                <Table.Cell>{limi.cantidad}</Table.Cell>
                <Table.Cell>{limi.taller_data.nombre}</Table.Cell>
                <Table.Cell>{limi.marca}</Table.Cell>
                <Table.Cell>{limi.tipo}</Table.Cell>
                <Table.Cell>{limi.potencia}</Table.Cell>
                <Table.Cell>{limi.rpm}</Table.Cell>
                <Table.Cell>{limi.voltage}</Table.Cell>
                <Table.Cell>{limi.corriente}</Table.Cell>
                <Actions limi={limi} editLimit={updateMuleto} />
              </Table.Row>
            ))
          ) : (
            <></>
          )}
        </Table.Body>
      </Table>
    </div>
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
