import React, { useEffect, useState } from "react";
import { getProductsCart, cleanProductCartApi } from "../../../api/cart";
import { Button, Input, Item, Icon, Form } from "semantic-ui-react";
import { useAlmacen, usePedidos } from "../../../hooks";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ItemCarrito } from "./itemCarrito";
import image from "../../../img/NoIMG.jpeg";
import "./Carrito.scss";

export function Carrito(props) {
  const { onClose, me } = props;
  const { getAlmacenById } = useAlmacen();
  const { addPedido, addInfoPedido } = usePedidos();
  const [band, setBand] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);
  const [products, setProducts] = useState(null);
  const idProductsCart = getProductsCart();
  useEffect(() => {
    (async () => {
      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getAlmacenById(idProduct.id);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const cancelar = () => {
    onClose();
    cleanProductCartApi();
  };
  const formik = useFormik({
    initialValues: initialValues(me.id),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setBand(true);
        const res = await addPedido(formValue);
        for (const idProduct of idProductsCart) {
          const updatedProduct = {
            ...idProduct,
            idPedido: res.id,
          };
          const res2 = await addInfoPedido(updatedProduct);
        }
        if (res) {
          cleanProductCartApi();
          toast.success("PEDIDO REALIZADO CON EXITO");
        } else {
          console.log(res);
          toast.error(res[0]);
        }
        setBand(false);
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!products) return null;
  return (
    <div className="carrito">
      <Form onSubmit={formik.handleSubmit}>
        {products.length === 0 ? (
          <h3>SIN PRODUCTOS EN EL CARRITO</h3>
        ) : (
          products.map((product, index) => (
            <div key={product.id}>
              <Item.Group>
                <Item>
                  {!product.image ? (
                    <Item.Image src={image} size="tiny" />
                  ) : (
                    <Item.Image src={product.image} size="tiny" />
                  )}
                  <Item.Content key={product.id}>
                    <Item.Header as="a">
                      {product.descripcion.substr(0, 30)}
                    </Item.Header>
                    <Item.Meta>{product.material}</Item.Meta>
                    <Item.Description>$ {product.coste}</Item.Description>
                    <ItemCarrito
                      index={index}
                      id={product.id}
                      setReloadCart={setReloadCart}
                    />
                  </Item.Content>
                </Item>
              </Item.Group>
            </div>
          ))
        )}
        {products.length > 0 && (
          <Button
            primary
            fluid
            content={"Perdir"}
            type="submit"
            loading={band}
            disabled={band}
          />
        )}

        {/* <Button color="red" fluid content={"Cancelar"} onClick={cancelar} /> */}
      </Form>
    </div>
  );
}
function initialValues(me) {
  return {
    idUser: me,
    ctotal: 1,
  };
}
function newValidationSchema() {
  return {
    idUser: Yup.number().required(true),
    ctotal: Yup.number().required(true),
    // cantidad: Yup.number().required(true),
    // OT: Yup.number().required(true),
  };
}
