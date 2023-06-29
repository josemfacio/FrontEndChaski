import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Form, Button, Card, Feed, Dropdown, Header } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMrp } from "../../../../hooks";
import image from "../../../../img/NoIMG.jpeg";
import "./AddEditMrpForm.scss";

export function AddEditMrpForm(props) {
  const { onClose, onRefetch, data } = props;
  const { addMrp } = useMrp();
  const [serch, setSerch] = useState(true);
  const formik = useFormik({
    initialValues: initialValues(data),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await addMrp(formValue);
        toast.success("PEDIDO REALIZADO CON ÉXITO");
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Form className="add-edit-mrp-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="material"
        type="number"
        placeholder="CODIGO PRODUCTO"
        disabled
      >
        <input
          value={formik.values.material}
          error={formik.errors.material}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="descripcion" placeholder="CODIGO PRODUCTO" disabled>
        <input
          value={formik.values.descripcion}
          error={formik.errors.descripcion}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="cantidad" placeholder="Cantidad">
        <input
          type="number"
          value={formik.values.cantidad}
          error={formik.errors.cantidad}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="nombre" placeholder="Comentario">
        <input
          value={formik.values.nombre}
          error={formik.errors.nombre}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Button type="submit" primary fluid content={"Solicitar"} />
    </Form>
  );
}

function initialValues(data) {
  return {
    idProd: data.id,
    descripcion: data.descripcion,
    material: data.material,
    cantidad: null,
    nombre: null,
  };
}
function newValidationSchema() {
  return {
    cantidad: Yup.number().required(true),
    nombre: Yup.string().required(true),
  };
}
