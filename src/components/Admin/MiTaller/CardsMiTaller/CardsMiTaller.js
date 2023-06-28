import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Pagination, Search, Image, Card, Button } from "semantic-ui-react";
import image from "../../../../img/NoIMG.jpeg";
import _, { values } from "lodash";
import { chunk } from "lodash";
import { toast } from "react-toastify";

import "./CardsMiTaller.scss";
export function CardsMiTaller(props) {
  const { talleInfo, setSerch } = props;
  const [activePage, setActivePage] = useState(1);
  const [tall, setTall] = useState(talleInfo);
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    let matchingTall = []; // Variable auxiliar para almacenar los elementos coincidentes
    talleInfo.forEach((talle, index) => {
      const descripcion = talle.almacen_data.descripcion.toLowerCase();
      if (searchValue.length === 0) {
        matchingTall.push(talle); // Agregar todos los elementos cuando no hay búsqueda
      } else if (descripcion.includes(searchValue)) {
        matchingTall.push(talle); // Agregar el elemento coincidente a la variable auxiliar
      }
    });

    setTall(matchingTall); // Actualizar el estado tall con los elementos coincidentes
  };
  const chunkedData = chunk(tall, 100);
  return (
    <>
      <div className="actions">
        <Search
          category
          placeholder="Buscar..."
          // onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          // onResultSelect={(e, data) =>
          //   dispatch({
          //     type: "UPDATE_SELECTION",
          //     selection: talleInfo.almacen_data.descripcion,
          //   })
          // }
          // onSearchChange={_.debounce(handleSearchChange, 1000, {
          //   leading: true,
          // })}
          showNoResults={false}
        />
        <Pagination
          totalPages={Math.ceil(talleInfo.length / 100)}
          activePage={activePage}
          pointing
          onPageChange={(e, { activePage }) => setActivePage(activePage)}
        />
      </div>
      {chunkedData !== null && chunkedData.length !== 0 ? (
        <div className="cards-almacen">
          <div className="item">
            <Card.Group stackable>
              {chunkedData !== null || chunkedData.length !== 0 ? (
                chunkedData[activePage - 1].map((item) => (
                  <Card key={item.id} className="card">
                    {!item.almacen_data.image ? (
                      <Image src={image} wrapped ui={false} />
                    ) : (
                      <Image src={item.almacen_data.image} />
                    )}
                    <Card.Content>
                      <Card.Header>{item.almacen_data.descripcion}</Card.Header>
                      <Card.Meta>
                        <span>{item.almacen_data.material}</span>
                      </Card.Meta>
                      <Card.Description>
                        Cantidad: {item.cantidad}
                        <br />
                      </Card.Description>
                      {/* <Card.Content extra>
                        <div className="buttons"></div>
                        <Button color="orange">Solicitar</Button>
                      </Card.Content> */}
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <></>
              )}
            </Card.Group>
          </div>
        </div>
      ) : (
        <>SIN ELEMENTOS QUE MOSTRAR</>
      )}
    </>
  );
}
