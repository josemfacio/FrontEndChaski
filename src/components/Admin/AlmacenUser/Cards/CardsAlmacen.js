import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Image,
  Card,
  Button,
  Icon,
  Loader,
  Input,
} from "semantic-ui-react";
import { Paginations } from "../../../Common";
import image from "../../../../img/NoIMG.jpeg";
import _ from "lodash";
import { chunk } from "lodash";
import { toast } from "react-toastify";
import "./CardsAlmacen.scss";
import { addProductCart } from "../../../../api/cart";

export function CardsAlmacen(props) {
  const { almacen, setSerch, loading } = props;
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [serch2, setSerch2] = useState(true);

  const addCart = (product) => {
    const res = addProductCart(product.id);
    if (res) {
      toast.success(`${product.descripcion} añadido al carrito`);
    } else {
      toast.warning(
        `${product.descripcion} el producto ya existe en el carrito`
      );
    }
  };

  const handleSearchChange = useCallback(
    _.debounce((value) => {
      setSearchValue(value.toLowerCase());
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    setSerch(searchValue.toLowerCase());
  }, []);
  useEffect(() => {
    if (!serch2) {
      setSerch(searchValue.toLowerCase());
      setSerch2(true);
    }
  }, [serch2]);
  if (!almacen) return null;
  const chunkedData = chunk(almacen, 100);

  return (
    <>
      <div className="actions">
        <Input
          onChange={(value) => {
            setSearchValue(value.target.value);
          }}
          className="inputFi"
        />
        <Button
          type="button"
          onClick={() => {
            setSerch2(!serch2);
          }}
        >
          Search
        </Button>
        <Paginations
          cant={almacen.length}
          cant2={100}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : chunkedData && chunkedData.length !== 0 ? (
        <div className="cards-almacen">
          <div className="userAl">
            <Card.Group stackable>
              {chunkedData[activePage - 1]?.map((item) => (
                <Card className="card-al" key={item.id}>
                  {!item.image ? (
                    <Image src={image} wrapped ui={false} />
                  ) : (
                    <Image src={item.image} />
                  )}
                  <Card.Content>
                    <Card.Header>{item.descripcion}</Card.Header>
                    <Card.Meta>
                      <span>{item.material}</span>
                    </Card.Meta>
                    <Card.Description>
                      Cantidad: {item.cantidad}
                      <br />
                      Ubicacion: {item.ubicacion}
                    </Card.Description>
                    <Card.Content extra>
                      <div className="buttons"></div>
                      {item.cantidad > 0 && (
                        <Button color="blue" onClick={() => addCart(item)}>
                          <Icon name="shopping cart" />
                        </Button>
                      )}
                    </Card.Content>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        </div>
      ) : (
        <>SIN ELEMENTOS QUE MOSTRAR</>
      )}
    </>
  );
}
