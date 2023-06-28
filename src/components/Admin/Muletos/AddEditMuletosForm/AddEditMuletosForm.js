import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Form, Button, Dropdown, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTaller, useMuletos } from "../../../../hooks";
import "./AddEditMuletosForm.scss";

export function AddEditMuletosForm(props) {
  const { onClose, onRefetch, muletos } = props;
  const { addMuletos, editMuletos } = useMuletos();
  const { getTaller, taller } = useTaller();
  const [previewImage, setPreviewImage] = useState(
    muletos ? muletos?.image : null
  );
  const formik = useFormik({
    initialValues: initialValues(muletos),
    validationSchema: Yup.object(
      muletos ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (muletos) {
          await editMuletos(muletos.id, formValue);
          toast.success("PRODUCTO ACTUALIZADO CORRECTAMENTE");
        } else {
          console.log(formValue);
          await addMuletos(formValue);
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
  let options2 = [];

  if (taller) {
    options = taller.map((item, index) => ({
      key: index,
      text: item.nombre,
      value: item.id,
    }));
    options2 = [
      {
        key: 1,
        text: "ESPERA",
        value: "ES",
      },
      {
        key: 2,
        text: "REPARANDO",
        value: "RP",
      },
      {
        key: 3,
        text: "REPARADO",
        value: "RD",
      },
    ];
  }
  return (
    <Form className="add-edit-mrp-form" onSubmit={formik.handleSubmit}>
      <Form.Input name="nombre" placeholder="NOMBRE MULETO">
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
      <Form.Input name="marca" type="number" placeholder="MARCA">
        <input
          value={formik.values.marca}
          error={formik.errors.marca}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="tipo" type="number" placeholder="TIPO">
        <input
          value={formik.values.tipo}
          error={formik.errors.tipo}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="potencia" type="number" placeholder="POTENCIA">
        <input
          value={formik.values.potencia}
          error={formik.errors.potencia}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="rpm" type="number" placeholder="RPM">
        <input
          value={formik.values.rpm}
          error={formik.errors.rpm}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="rpm" type="number" placeholder="VOLTAGE">
        <input
          value={formik.values.voltage}
          error={formik.errors.voltage}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Form.Input name="corriente" type="number" placeholder="CORRIENTE">
        <input
          value={formik.values.corriente}
          error={formik.errors.corriente}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <Dropdown
        clearable
        options={options2}
        selection
        value={formik.values.estado}
        error={formik.errors.estado}
        onChange={(event, data) => formik.setFieldValue("estado", data.value)}
      />
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
      <Dropdown
        clearable
        options={options}
        selection
        value={formik.values.idTaller}
        error={formik.errors.idTaller}
        onChange={(event, data) => formik.setFieldValue("idTaller", data.value)}
      />
      <Button
        type="submit"
        primary
        fluid
        content={muletos ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}

function initialValues(herra) {
  return {
    idTaller: herra?.id || null,
    nombre: herra?.nombre || null,
    cantidad: herra?.cantidad || null,
    marca: herra?.marca || null,
    tipo: herra?.tipo || null,
    potencia: herra?.potencia || null,
    rpm: herra?.rpm || null,
    voltage: herra?.voltage || null,
    corriente: herra?.corriente || null,
    estado: herra?.estado || null,
    image: "",
  };
}
function newValidationSchema() {
  return {
    idTaller: Yup.number().required(true),
    nombre: Yup.string().required(true),
    cantidad: Yup.number().required(true),
    image: Yup.string(),
    marca: Yup.string(),
    tipo: Yup.string(),
    potencia: Yup.number().required(true),
    rpm: Yup.number().required(true),
    voltage: Yup.number().required(true),
    corriente: Yup.number().required(true),
    estado: Yup.string().required(true),
  };
}

function updateValidationSchema() {
  return {
    idTaller: Yup.number().required(true),
    nombre: Yup.string().required(true),
    cantidad: Yup.number().required(true),
    image: Yup.string(),
    marca: Yup.string(),
    tipo: Yup.string(),
    potencia: Yup.number().required(true),
    rpm: Yup.number().required(true),
    voltage: Yup.number().required(true),
    corriente: Yup.number().required(true),
    estado: Yup.string().required(true),
  };
}
