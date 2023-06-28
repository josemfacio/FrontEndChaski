import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { Form, Button, Card, Feed, Dropdown, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAlmacen, useTallerInfo } from "../../../../hooks";
import image from "../../../../img/NoIMG.jpeg";

export function AddEditProductForm(props) {
  const { onClose, onRefetch, data } = props;
  const { addTallerInfo } = useTallerInfo();
  const { getSerchAlmacen, almacen, loading } = useAlmacen();
  const [serch, setSerch] = useState(true);
  const formik = useFormik({
    initialValues: initialValues(data.id),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const res = await addTallerInfo(formValue);
        if (res[0]) {
          toast.error(res[0]);
        } else {
          toast.success("PRODUCTO AGREGADO CORRECTAMENTE AL TALLER");
        }

        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (!serch) {
      getSerchAlmacen(formik.values.input);
      setSerch(false);
    }
  }, [serch]);
  return (
    <Form className="add-edit-almacen-form" onSubmit={formik.handleSubmit}>
      <Form.Input name="input" type="number" placeholder="CODIGO PRODUCTO">
        <input
          type="number"
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
      {loading || !almacen ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <Card>
          <Card.Content>
            <Card.Header>Productos encontrados</Card.Header>
          </Card.Content>
          <Card.Content>
            {almacen.length < 5 ? (
              <>
                {map(almacen, (alma, index) => {
                  return (
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
                                color="green"
                                onClick={() => {
                                  formik.setFieldValue("idProd", "");
                                }}
                                type="button"
                              >
                                Si
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                basic
                                color="red"
                                type="button"
                                onClick={() => {
                                  formik.setFieldValue("idProd", alma.id);
                                }}
                              >
                                No
                              </Button>
                            </>
                          )}
                        </div>
                      </Card.Content>
                    </>
                  );
                })}
              </>
            ) : (
              <>Existen muchos items con ID similares</>
            )}
          </Card.Content>
        </Card>
      )}
      <Form.Input
        name="cantidad"
        type="number"
        placeholder="Cantidad Limite"
        value={formik.values.cantidad}
        error={formik.errors.cantidad}
        onChange={formik.handleChange}
      />
      <Button type="submit" primary fluid content={"Crear"} />
    </Form>
  );
}

function initialValues(tallerInfo) {
  return {
    idProd: null,
    cantidad: 0,
    idTaller: tallerInfo,
    input: "",
  };
}
function newValidationSchema() {
  return {
    idProd: Yup.number().required(true),
    cantidad: Yup.number().required(true),
  };
}
