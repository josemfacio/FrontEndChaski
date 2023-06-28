import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Form, Button, Card, Feed, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAlmacen, useTaller, useLimite } from "../../../../hooks";
import image from "../../../../img/NoIMG.jpeg";
import "./AddEditLimitForm.scss";

export function AddEditLimitForm(props) {
  const { onClose, onRefetch, alma } = props;
  const { addLimit, editLimit } = useLimite();
  const { getSerchAlmacen, almacen } = useAlmacen();
  const { taller, getTaller } = useTaller();
  const [serch, setSerch] = useState(true);
  let a = true;
  const [cod, setCod] = useState("");
  const formik = useFormik({
    initialValues: initialValues(alma),
    validationSchema: Yup.object(
      alma ? updateValidationSchema() : newValidationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (alma) {
          await editLimit(alma.id, formValue);
          toast.success("LIMITE ACTUALIZADO CORRECTAMENTE");
        } else {
          const res = await addLimit(formValue);
          if (res[0]) {
            toast.error(res[0]);
          } else {
            toast.success("LIMITE CREADO CORRECTAMENTE");
          }
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    getSerchAlmacen(formik.values.input);
    getTaller();
  }, [serch, formik.values.input]);
  let options = [];

  if (taller) {
    options = taller.map((item, index) => ({
      key: index,
      text: item.nombre,
      value: item.id,
    }));
  }
  return (
    <Form className="add-edit-almacen-form" onSubmit={formik.handleSubmit}>
      <Form.Input name="input" type="number" placeholder="CODIGO PRODUCTO">
        <input
          value={formik.values.input}
          error={formik.errors.input}
          onChange={formik.handleChange}
        />
        <Button
          type="button"
          onClick={() => {
            setSerch(!serch);
            console.log(almacen);
          }}
        >
          Search
        </Button>
      </Form.Input>
      {almacen != null && almacen.length > 0 ? (
        <>
          <Card>
            <Card.Content>
              <Card.Header>Productos encontrados</Card.Header>
            </Card.Content>
            <Card.Content>
              {map(almacen, (alma, index) => {
                if (cod === "") {
                  setCod(alma.material);
                } else {
                  if (alma.material !== cod) {
                    a = false;
                    return null;
                  } else {
                    a = true;
                    return (
                      <>
                        {almacen.length <= 6 && (
                          <>
                            <Feed key={index}>
                              <Feed.Event>
                                {!alma.image ? (
                                  <Feed.Label image={image} />
                                ) : (
                                  <Feed.Label image={alma.image} />
                                )}

                                <Feed.Content>
                                  <Feed.Date content={alma.material} />
                                  <Feed.Summary>
                                    <p>Almacen: {alma.almacen}</p>
                                    <p>Cantidad: {alma.cantidad}</p>
                                  </Feed.Summary>
                                </Feed.Content>
                              </Feed.Event>
                            </Feed>
                            <Card.Content extra>
                              <div className="ui two buttons">
                                {formik.values.idProd === alma.id ? (
                                  <>
                                    <Button
                                      basic
                                      color="red"
                                      onClick={() =>
                                        formik.setFieldValue("idProd", "")
                                      }
                                      type="button"
                                    >
                                      No
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      basic
                                      color="green"
                                      type="button"
                                      onClick={() =>
                                        formik.setFieldValue("idProd", alma.id)
                                      }
                                    >
                                      Si
                                    </Button>
                                  </>
                                )}
                              </div>
                            </Card.Content>
                          </>
                        )}
                      </>
                    );
                  }
                }
              })}
              {!a && <h1>Existen muchos items con ID similares</h1>}
            </Card.Content>
          </Card>
        </>
      ) : (
        <h1>SIN RESULTADOS</h1>
      )}
      <Form.Input
        name="cantidad"
        type="number"
        placeholder="Cantidad Limite"
        value={formik.values.cantidad}
        error={formik.errors.cantidad}
        onChange={formik.handleChange}
      />
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
        content={alma ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}

function initialValues(almacen) {
  return {
    idProd: almacen?.almacen_data.id || null,
    cantidad: almacen?.cantidad || null,
    idTaller: almacen?.taller_data.id || null,
    input: almacen?.almacen_data.material,
  };
}
function newValidationSchema() {
  return {
    idProd: Yup.number().required(true),
    cantidad: Yup.number().required(true),
    idTaller: Yup.number().required(true),
  };
}

function updateValidationSchema() {
  return {
    idProd: Yup.number().required(true),
    cantidad: Yup.number().required(true),
    idTaller: Yup.number().required(true),
  };
}
