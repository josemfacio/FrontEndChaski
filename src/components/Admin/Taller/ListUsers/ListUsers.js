import React, { useState } from "react";
import { Button, Card, Feed, Icon } from "semantic-ui-react";
import { chunk } from "lodash";
import { Paginations } from "../../../Common";

import _ from "lodash";
import image from "../../../../img/NoIMG.jpeg";
import "./ListUsers.scss";
export function Listusers(props) {
  const [activePage, setActivePage] = useState(1);
  const { mostrar, setMostrar } = useState(false);
  const { talleInfo } = props;
  const chunkedData = chunk(talleInfo, 5);
  if (!talleInfo || talleInfo == 0) return null;
  return (
    <div>
      <Card>
        <Card.Content className="content-card">
          {talleInfo.length > 0 ? (
            <Card.Header>
              <h2>CONSUMIBLES</h2>
            </Card.Header>
          ) : (
            <Card.Header>
              <h2>SIN CONSUMIBLES</h2>
            </Card.Header>
          )}
        </Card.Content>
        <Card.Content>
          {chunkedData !== null && chunkedData.length !== 0 ? (
            chunkedData[activePage - 1].map((talleinf, index) => (
              <Feed key={index}>
                <Feed.Event>
                  {!talleinf.almacen_data.image ? (
                    <Feed.Label image={image} />
                  ) : (
                    <Feed.Label image={talleinf.almacen_data.image} />
                  )}
                  <Feed.Content>
                    <Feed.Date
                      content={
                        talleinf.almacen_data.descripcion +
                        " " +
                        talleinf.almacen_data.material
                      }
                    />
                    <Feed.Summary>{talleinf.cantidad}</Feed.Summary>
                  </Feed.Content>
                  {/* <Actions /> */}
                </Feed.Event>
              </Feed>
            ))
          ) : (
            <></>
          )}
        </Card.Content>
      </Card>
      <Paginations
        cant={talleInfo.length}
        cant2={5}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
}
function Actions(props) {
  const { almacen, updateAlmacen, delteAlmacen } = props;
  return (
    <>
      <Button
        type="button"
        icon
        negative
        onClick={() => console.log("Eliminando")}
      >
        <Icon name="close" />
      </Button>
    </>
  );
}
