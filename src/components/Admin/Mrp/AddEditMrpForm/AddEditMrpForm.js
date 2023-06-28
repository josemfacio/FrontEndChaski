import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Form, Button, Card, Feed, Dropdown } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAlmacen, useMrp } from "../../../../hooks";
import image from "../../../../img/NoIMG.jpeg";
import "./AddEditMrpForm.scss";

export function AddEditMrpForm(props) {
  const { onClose, onRefetch, mrp } = props;
  const { addMrp, editMrp } = useMrp();
  const { getSerchAlmacen, almacen } = useAlmacen();
  const [serch, setSerch] = useState(true);
  const [reportInfo, setReportInfo] = useState([]);
  let a = true;
  const [cod, setCod] = useState("");
  const formik = useFormik({
    initialValues: initialValues(mrp),

    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await Promise.all(
          Object.keys(reportInfo).map(async (repo) => {
            await addMrp(reportInfo[repo]);
          })
        );
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    getSerchAlmacen(formik.values.input);
  }, [serch, formik.values.input]);
  return (
    <Form className="add-edit-mrp-form" onSubmit={formik.handleSubmit}>
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
                        {almacen.length < 7 && (
                          <div>
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
                                {reportInfo[alma.id] ? (
                                  <Button
                                    basic
                                    color="red"
                                    onClick={() => {
                                      setReportInfo((prevData) => {
                                        const newData = { ...prevData };
                                        delete newData[alma.id];
                                        return newData;
                                      });
                                    }}
                                    type="button"
                                  >
                                    No
                                  </Button>
                                ) : (
                                  <Button
                                    basic
                                    color="green"
                                    type="button"
                                    onClick={() => {
                                      setReportInfo((prevData) => {
                                        const newData = { ...prevData };
                                        newData[alma.id] = {
                                          ...newData[alma.id],
                                          idProd: alma.id,
                                          active: true,
                                        };
                                        return newData;
                                      });
                                    }}
                                  >
                                    Si
                                  </Button>
                                )}
                              </div>
                            </Card.Content>
                          </div>
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
      <Button
        type="submit"
        primary
        fluid
        content={mrp ? "Actualizar " : "Crear"}
      />
    </Form>
  );
}

function initialValues(mrp) {
  return {
    idProd: mrp?.almacen_data.id || null,
    activate: mrp?.activate,
  };
}
function newValidationSchema() {
  return {
    idProd: Yup.number().required(true),
    activate: Yup.boolean().required(true),
  };
}

function updateValidationSchema() {
  return {
    idProd: Yup.number().required(true),
    activate: Yup.boolean().required(true),
  };
}
