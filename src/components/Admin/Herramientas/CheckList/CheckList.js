import React, { useEffect, useState } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useHerramientas, useRespuesta } from "../../../../hooks";
import * as Yup from "yup";

export function CheckList({ herramienta, onClose, onRefetch, auth }) {
  const { getSerchPregunta } = useHerramientas();
  const { addRespuesta, loading, addRespuestaInfo } = useRespuesta();

  const [res, setRes] = useState(null);
  const [respuestas, setRespuestas] = useState([]); // Estado para almacenar las respuestas

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSerchPregunta(herramienta.tipo);
      setRes(response);
      // Inicializar el estado de las respuestas
      setRespuestas(
        response.map((pregunta) => ({
          idRespuesta: 0,
          idPregunta: pregunta.id,
          respueta: true,
        }))
      );
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(herramienta, auth),
    validationSchema: Yup.object(newValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        onClose();
        onRefetch();
        const res = await addRespuesta(formValue);
        for (const element of respuestas) {
          element.idRespuesta = res.id;
          await addRespuestaInfo(element);
        }
        toast.success("Reporte registrado correctamente");
      } catch (error) {
        console.log(error);
        toast.error("Error");
      }
    },
  });

  if (!res) return <h1>HERRAMIENTA SIN PREGUNTAS</h1>;

  return (
    <Form onSubmit={formik.handleSubmit}>
      {res.map((r, index) => (
        <div className="add-edit-user-form__active" key={r.id}>
          <Checkbox
            toggle
            checked={respuestas[index].respueta}
            onChange={(_, data) => {
              const updatedRespuestas = [...respuestas]; // Crear una copia de respuestas
              updatedRespuestas[index].respueta = data.checked; // Actualizar el valor de respuesta en la copia
              setRespuestas(updatedRespuestas); // Actualizar el estado de respuestas con la copia modificada
            }}
          />
          {r.enunciado}
        </div>
      ))}
      <Form.Input name="comentario" placeholder="COMENTARIOS">
        <input
          value={formik.values.comentario}
          error={formik.errors.comentario}
          onChange={formik.handleChange}
        />
      </Form.Input>
      <div className="add-edit-user-form__staff">
        <Checkbox
          toggle
          checked={formik.values.funciona}
          onChange={(_, data) => formik.setFieldValue("funciona", data.checked)}
        />
        LA HERRAMIENTA FUNCIONA
      </div>

      <Button type="submit" primary fluid content={"CREAR REPORTE"} />
    </Form>
  );
}

function initialValues(herra, auth) {
  return {
    idUser: auth?.id || 0,
    idHerramienta: herra?.id || "",
    comentario: herra?.comentario || "",
    funciona: true,
  };
}

function newValidationSchema() {
  return {
    idUser: Yup.number().required(true),
    idHerramienta: Yup.number().required(true),
    comentario: Yup.string().required(true),
    funciona: Yup.boolean().required(true),
  };
}
