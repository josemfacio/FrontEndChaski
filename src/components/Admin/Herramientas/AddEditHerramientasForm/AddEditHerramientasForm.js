import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Form, Button, Dropdown, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTaller, useHerramientas } from "../../../../hooks";
import "./AddEditHerramientasForm.scss";

export function AddEditHerramientasForm(props) {
  const { onClose, onRefetch, herramienta } = props;
  const { addHerramientas, editHerramientas } = useHerramientas();
  const { getTaller, taller } = useTaller();
  const [previewImage, setPreviewImage] = useState(
    herramienta ? herramienta?.image : null
  );
  const formik = useFormik({
    initialValues: initialValues(herramienta),
    validationSchema: Yup.object(
      herramienta ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (herramienta) {
          await editHerramientas(herramienta.id, formValue);
          toast.success("PRODUCTO ACTUALIZADO CORRECTAMENTE");
        } else {
          console.log(formValue);
          await addHerramientas(formValue);
          toast.success("PRODUCTO CREADO CORRECTAMENTE");
        }
        onClose();
        onRefetch();
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
  useEffect(() => {
    getTaller();
  }, []);
  let options = [];

  if (taller) {
    options = taller.map((item, index) => ({
      key: index,
      text: item.nombre,
      value: item.id,
    }));
  }
  return (
    <Form className="add-edit-mrp-form" onSubmit={formik.handleSubmit}>
      <Form.Input name="nombre" placeholder="NOMBRE HERRAMIENTA">
        <input
          value={formik.values.nombre}
          error={formik.errors.nombre}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="cantidad" type="number" placeholder="CANTIDAD">
        <input
          value={formik.values.cantidad}
          error={formik.errors.cantidad}
          onChange={formik.handleChange}
        />
      </Form.Input>
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
      {!herramienta && (
        <Dropdown
          clearable
          options={options}
          selection
          value={formik.values.idTaller}
          error={formik.errors.idTaller}
          onChange={(event, data) =>
            formik.setFieldValue("idTaller", data.value)
          }
        />
      )}

      <Button
        type="submit"
        primary
        fluid
        content={herramienta ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}

function initialValues(herra) {
  return {
    idTaller: herra?.idTaller || "",
    nombre: herra?.nombre || "",
    cantidad: herra?.cantidad || 0,
    image: "",
  };
}
function newValidationSchema() {
  return {
    idTaller: Yup.number().required(true),
    nombre: Yup.string().required(true),
    cantidad: Yup.number().required(true),
    image: Yup.string(),
  };
}

function updateValidationSchema() {
  return {
    idTaller: Yup.number().required(true),
    nombre: Yup.string().required(true),
    cantidad: Yup.number().required(true),
    image: Yup.string(),
  };
}
