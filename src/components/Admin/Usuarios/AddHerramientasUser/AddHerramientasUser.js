import React, { useEffect, useState, useCallback } from "react";
import { Form, Button, Checkbox, Dropdown, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useUser } from "../../../../hooks";

export function AddHerramientasUser(props) {
  const { onClose, onRefetch, user } = props;
  const [previewImage, setPreviewImage] = useState(null);
  const { addUserHerramienta } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
        await addUserHerramienta(formValue);
        toast.success("HERRAMIENTA AGREGADA CORRECTAMENTE");
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
        toast.error("Error al procesar la solicitud");
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
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="nombre"
        placeholder="Nombre de la herramienta"
        value={formik.values.nombre}
        error={formik.errors.nombre}
        onChange={formik.handleChange}
      />
      <Form.Input
        name="cantidad"
        placeholder="Cantidad"
        value={formik.values.cantidad}
        error={formik.errors.cantidad}
        onChange={formik.handleChange}
      />
      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.unidad}
          onChange={(_, data) => formik.setFieldValue("unidad", data.checked)}
        />
        Unidad
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
      <Button type="submit" primary fluid content={"Agregar Herramienta"} />
    </Form>
  );
}
function initialValues(user) {
  return {
    idUser: user.idUser,
    nombre: "",
    cantidad: 0,
    unidad: true,
    image: "",
  };
}
function newValidationSchema() {
  return {
    idUser: Yup.number().required(true),
    nombre: Yup.string().required(true),
    cantidad: Yup.string().required(true),
    unidad: Yup.bool().required(true),
    image: Yup.string(),
  };
}
