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
import "./TableHerramientas.scss";

export function TableHerramientas(props) {
  const {
    herramientas,
    setSerch,
    onRefetch,
    updateHerramienta,
    newCheckList,
    auth,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const chunkedData = chunk(herramientas, 100);
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
  if (!herramientas) return null;
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
          cant={herramientas.length}
          cant2={100}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      <Table className="table-limit">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>HERRAMIENTA</Table.HeaderCell>
            <Table.HeaderCell>IMAGEN</Table.HeaderCell>
            <Table.HeaderCell>CANTIDAD</Table.HeaderCell>
            <Table.HeaderCell>TALLER</Table.HeaderCell>
            <Table.HeaderCell>ACCIONES</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {chunkedData !== null && chunkedData.length !== 0 ? (
            chunkedData[activePage - 1].map((limi, index) => (
              <Table.Row key={limi.id}>
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
                <Actions
                  limi={limi}
                  editLimit={updateHerramienta}
                  newCheckList={newCheckList}
                  auth={auth.me.is_staff}
                />
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
  const { limi, editLimit, newCheckList, auth } = props;
  return (
    <Table.Cell textAlign="right">
      {auth && (
        <Button icon color="yellow" onClick={() => editLimit(limi)}>
          <Icon name="pencil" />
        </Button>
      )}

      <Button icon color="blue" onClick={() => newCheckList(limi)}>
        <Icon name="list alternate outline" />
      </Button>
    </Table.Cell>
  );
}
