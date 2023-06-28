import React, { useState, useEffect } from "react";
import { Button, Input, Item, Icon } from "semantic-ui-react";
import {
  editProductCantApi,
  editProductOTApi,
  removeProductCartApi,
  findProductCart,
} from "../../../api/cart";
export function ItemCarrito(props) {
  const { index, setReloadCart, id } = props;
  const [data, setData] = useState([]);
  const [band, setBand] = useState(false);
  const OnChangeCant = async (event, index) => {
    await editProductCantApi(index, event.target.value);
    setBand(!band);
  };
  const OnChangeOT = async (event, index) => {
    await editProductOTApi(index, event.target.value);
    setBand(!band);
  };
  const eliminarProd = async () => {
    setReloadCart(true);
    await removeProductCartApi(index);
    setReloadCart(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const productData = await findProductCart(id);
      setData(productData);
    };
    fetchData();
  }, [band]);
  if (!data) return null;
  return (
    <Item.Extra>
      <Input
        type="number"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        placeholder="Cant."
        value={data.cantidad}
        // error={formik.errors.cantidad}
        onChange={(event) => OnChangeCant(event, index)}
      />
      <Input
        className="ot"
        type="number"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        placeholder="OT"
        value={data.ot}
        onChange={(event) => OnChangeOT(event, index)}
      />
      <Button
        icon
        color="red"
        onClick={() => {
          eliminarProd();
        }}
        type="button"
      >
        <Icon name="cancel" />
      </Button>
    </Item.Extra>
  );
}
