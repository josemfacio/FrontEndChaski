import React, { useState, useEffect, useCallback } from "react";
import { Table, Search } from "semantic-ui-react";
import { Paginations } from "../../../Common";

import TableDatails from "../../../../components/Admin/Almacen/TableAlmacen/TableDatails";
import _ from "lodash";

import "./TableAlmacen.scss";

export function TableAlmacen(props) {
  const { almacen, updateAlmacen, delteAlmacen, setSerch } = props;
  const [activePage, setActivePage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSearchChange = useCallback(
    (e) => {
      setSearchValue(e.target.value);
    },
    [setSearchValue]
  );
  useEffect(() => {
    async function fetchData() {
      setSerch(searchValue.toLowerCase());
    }

    fetchData();
  }, [searchValue]);
  const handleSort = useCallback(
    (clickedColumn) => {
      if (sortColumn !== clickedColumn) {
        setSortColumn(clickedColumn);
        setSortDirection("ascending");
        return;
      }

      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    },
    [sortColumn, sortDirection, setSortColumn, setSortDirection]
  );

  const handleResultSelect = (e, result) => {
    setSearchValue(result.material);
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <div className="table-almacen-admin">
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
          cant={almacen.length}
          cant2={100}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>

      <Table className="table-almacen-admin sortable">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sortColumn === "material" ? sortDirection : null}
              onClick={() => handleSort("material")}
            >
              Material
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "descripcion" ? sortDirection : null}
              onClick={() => handleSort("descripcion")}
            >
              Descripcion
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "cantidad" ? sortDirection : null}
              onClick={() => handleSort("cantidad")}
            >
              Cantidad
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "unidad" ? sortDirection : null}
              onClick={() => handleSort("unidad")}
            >
              Unidad
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "almacen" ? sortDirection : null}
              onClick={() => handleSort("almacen")}
            >
              Almacen
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "coste" ? sortDirection : null}
              onClick={() => handleSort("coste")}
            >
              Repuesto
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "coste" ? sortDirection : null}
              onClick={() => handleSort("coste")}
            >
              Costo Total
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={sortColumn === "ubicacion" ? sortDirection : null}
              onClick={() => handleSort("ubicacion")}
            >
              Ubicación
            </Table.HeaderCell>
            <Table.HeaderCell>Maquina</Table.HeaderCell>
            <Table.HeaderCell>Imagen</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <TableDatails
            almacen={almacen}
            updateAlmacen={updateAlmacen}
            delteAlmacen={delteAlmacen}
            activePage={activePage}
          />
        </Table.Body>
      </Table>
    </div>
  );
}
