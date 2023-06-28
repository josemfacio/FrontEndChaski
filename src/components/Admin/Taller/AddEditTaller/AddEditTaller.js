import React, { useEffect } from "react";
import { Form, Button, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTaller, useTallerUser, useTallerInfo } from "../../../../hooks";
import { Listusers } from "../";
import "./AddEditTaller.scss";
export function AddEditTaller(props) {
  const { onClose, onRefetch, taller } = props;
  const { getSerchTalleInfo, talleInfo, loading } = useTallerInfo();
  const { addTaller, editTaller } = useTaller();
  const formik = useFormik({
    initialValues: initialValues(taller),
    validationSchema: Yup.object(newUpdateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (taller) {
          await editTaller(taller.id, formValue);
          toast.success("TALLER ACTUALIZADO CORRECTAMENTE");
        } else {
          await addTaller(formValue);
          toast.success("TALLER CREADO CORRECTAMENTE");
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (taller) getSerchTalleInfo(taller.id);
  }, []);
  return (
    <Form className="add-edit-taller-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="nombre"
        placeholder="Nombre de taller"
        value={formik.values.nombre}
        error={formik.errors.nombre}
        onChange={formik.handleChange}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <div>
          {talleInfo ? (
            <Listusers talleInfo={talleInfo} />
          ) : (
            <Loader active inline="centered">
              Cargando...
            </Loader>
          )}
        </div>
      )}

      <Button
        type="submit"
        primary
        fluid
        content={taller ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}
function initialValues(taller) {
  return {
    nombre: taller?.nombre || "",
  };
}
function newUpdateValidationSchema() {
  return {
    nombre: Yup.string().required(true),
  };
}
