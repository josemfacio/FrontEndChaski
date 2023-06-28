import React, { useState } from "react";
import { Button, Form, Progress, List } from "semantic-ui-react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "./AddBD.scss";
import { useAlmacen } from "../../../../hooks/useAlmacen";

export function AddBD({ onClose, onRefetch }) {
  const { getSerchAlmacenMate, editAlmacen } = useAlmacen();
  const [porcent, setPorcent] = useState(0);
  const [error, setError] = useState([]);
  const [errorDatos, setErrorDatos] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let pos = 0;
    const file = event.target.elements.archivo.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const contents = e.target.result;
        const workbook = XLSX.read(contents, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (!data || data.length === 0) {
          toast.error("No se encontraron datos");
        } else {
          for (const element of data) {
            if (!element[0] || !element[1] || !element[2]) {
              errorDatos.push(element[0]);
            } else {
              const res = await getSerchAlmacenMate(element[0]);
              if (res === undefined || res.length === 0) {
                error.push(element[0]);
              } else {
                for (const articulo of res) {
                  if (parseInt(articulo.almacen) === element[2]) {
                    if (articulo.cantidad !== element[1]) {
                      articulo.cantidad = element[1];
                      if (!articulo.ubicacion) {
                        articulo.ubicacion = "a";
                      }
                      const { image, ...rest } = articulo;
                      await editAlmacen(articulo.id, rest);
                    }
                  }
                }
              }
            }
            setPorcent(((pos + 1) / data.length) * 100);
            pos++;
          }
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input type="file" name="archivo" className="uiAC" />
        <Progress percent={porcent} indicating />
        <Button type="submit">ACTUALIZAR</Button>
      </Form>
      {error.length > 0 && (
        <div>
          <h1>NO ENCONTRADOS</h1>
          <List bulleted>
            {error.map((erro) => {
              return <List.Item>{erro}</List.Item>;
            })}
          </List>
        </div>
      )}
      {errorDatos.length > 0 && (
        <div>
          <h1>DATOS INCOMPLETOS</h1>
          <List bulleted>
            {errorDatos.map((erroDA) => {
              return <List.Item>{erroDA}</List.Item>;
            })}
          </List>
        </div>
      )}
    </>
  );
}
