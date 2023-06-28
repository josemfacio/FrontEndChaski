import React, { useState, useCallback } from "react";
import { Form, Button, Checkbox, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAlmacen } from "../../../../hooks";
import "./AddEditAlmacenForm.scss";

export function AddEditAlmacenForm(props) {
  const { onClose, onRefetch, almacen } = props;
  const { addAlmacen, editAlmacen } = useAlmacen();
  const [previewImage, setPreviewImage] = useState(
    almacen ? almacen?.image : null
  );
  const formik = useFormik({
    initialValues: initialValues(almacen),
    validationSchema: Yup.object(
      almacen ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (almacen) {
          await editAlmacen(almacen.id, formValue);
          console.log(formValue.cantidad);
          toast.success("PRODUCTO ACTUALIZADO CORRECTAMENTE");
        } else {
          await addAlmacen(formValue);

          toast.success("PRODUCTO CREADO CORRECTAMENTE");
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });
  return (
    <Form className="add-edit-almacen-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="material"
        placeholder="Codigo de material"
        value={formik.values.material}
        error={formik.errors.material}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="descripcion"
        placeholder="Descripción"
        value={formik.values.descripcion}
        error={formik.errors.descripcion}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="cantidad"
        placeholder="Cantidad"
        value={formik.values.cantidad}
        error={formik.errors.cantidad}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="unidad"
        placeholder="Unidad"
        value={formik.values.unidad}
        error={formik.errors.unidad}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="almacen"
        placeholder="Almacen"
        value={formik.values.almacen}
        error={formik.errors.almacen}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="coste"
        placeholder="Costo Total"
        value={formik.values.coste}
        error={formik.errors.coste}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="ubicacion"
        placeholder="Ubicación"
        value={formik.values.ubicacion}
        error={formik.errors.ubicacion}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="maquina"
        placeholder="maquina"
        value={formik.values.maquina}
        error={formik.errors.maquina}
        onChange={formik.handleChange}
      />
      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.estado}
          onChange={(_, data) => formik.setFieldValue("estado", data.checked)}
        />
        Producto Activo
      </div>
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image src={previewImage} />
      <Button
        type="submit"
        primary
        fluid
        content={almacen ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}

function initialValues(almacen) {
  return {
    material: almacen?.material || "",
    descripcion: almacen?.descripcion || "",
    cantidad: almacen?.cantidad || 0,
    unidad: almacen?.unidad || "",
    almacen: almacen?.almacen || "",
    maquina: almacen?.maquina || "",
    coste: almacen?.coste || 0,
    ubicacion: almacen?.ubicacion || "",
    estado: almacen?.estado ? true : false,
    image: "",
  };
}
function newValidationSchema() {
  return {
    material: Yup.number().required(true),
    descripcion: Yup.string().required(true),
    cantidad: Yup.number().required(true),
    unidad: Yup.string().required(true),
    almacen: Yup.number().required(true),
    maquina: Yup.string(),
    coste: Yup.number().required(true),
    ubicacion: Yup.string().required(true),
    estado: Yup.bool().required(true),
    image: Yup.string(),
  };
}

function updateValidationSchema() {
  return {
    cantidad: Yup.number().required(true),
    coste: Yup.number().required(true),
    estado: Yup.bool().required(true),
    maquina: Yup.string(),
    image: Yup.string(),
  };
}
