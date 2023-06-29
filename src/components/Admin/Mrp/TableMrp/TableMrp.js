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
import "./TableMrp.scss";

export function TableMrp(props) {
  const { mrp } = props;
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const chunkedData = chunk(mrp, 100);
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
  console.log(mrp);
  return (
    <div>
      <div className="actions">
        <Search
          category
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 1000, {
            leading: true,
          })}
          loading={isLoading}
          showNoResults={false}
        />
        <Paginations
          cant={mrp.length}
          cant2={100}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      <Table className="table-limit">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
            <Table.HeaderCell>CODIGO</Table.HeaderCell>
            <Table.HeaderCell>IMAGEN</Table.HeaderCell>
            <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
            <Table.HeaderCell>COMENTARIO</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {chunkedData !== null && chunkedData.length !== 0 ? (
          chunkedData[activePage - 1].map((limi, index) => (
            <Table.Body>
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
                <Table.Cell>{limi.cantidad}</Table.Cell>
                <Table.Cell>{limi.nombre}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        ) : (
          <></>
        )}
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
