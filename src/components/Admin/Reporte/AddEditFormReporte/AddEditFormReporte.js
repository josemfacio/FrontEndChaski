import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Search, Loader } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  useReporte,
  useTallerInfo,
  useReporteInfo,
  useLimite,
} from "../../../../hooks";
import { TableReport } from "./TableReport";
import "./AddEditFormReporte.scss";
export function AddEditFormReporte(props) {
  const { onClose, onRefetch, me, tallerInfo } = props;
  const { addReport } = useReporte();
  const { addReportInfo } = useReporteInfo();
  const { getSerchLimite } = useLimite();
  const { editTalleInfo } = useTallerInfo();
  const [cargando, setCargando] = useState(false);
  const [reportInfo, setReportInfo] = useState(null);
  const [tall, setTall] = useState(tallerInfo);
  // const handleSearchChange = useCallback(
  //   (e) => {
  //     const valores = tallerInfo.map((obj) => obj.almacen_data.descripcion);
  //     const resultados = valores.filter((valor) => {
  //       const a = valor.includes(e.target.value);
  //     });
  //     console.log(resultados);
  //   },

  //   [tallerInfo]
  // );
  const formik = useFormik({
    initialValues: initialValues(me, tallerInfo),
    validationSchema: Yup.object(newUpdateValidationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        Object.keys(reportInfo).map(async (repo) => {
          const response2 = await getSerchLimite(repo);
          response2.map((res) => {
            if (res.cantidad >= reportInfo[repo].cantidad) {
              formValue.alerta = false;
            }
          });
        });
        setCargando(true);
        const response = await addReport(formValue);
        await Promise.all(
          Object.keys(reportInfo).map(async (repo) => {
            const newData = { ...reportInfo[repo] };
            reportInfo[repo] = {
              ...newData,
              idReporte: parseInt(response.id),
              idTaller: tallerInfo[0].idTaller,
            };
            // actualizamos la información de addreport
            await addReportInfo(reportInfo[repo]);
            //actualizamos la información de editTalle
            await editTalleInfo(reportInfo[repo]);
            setCargando(false);
          })
        );
        toast.success("REPORTE CREADO CORRECTAMENTE");
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    let matchingTall = []; // Variable auxiliar para almacenar los elementos coincidentes
    tallerInfo.forEach((talle, index) => {
      const descripcion = talle.almacen_data.descripcion.toLowerCase();
      if (searchValue.length === 0) {
        matchingTall.push(talle); // Agregar todos los elementos cuando no hay búsqueda
      } else if (descripcion.includes(searchValue)) {
        matchingTall.push(talle); // Agregar el elemento coincidente a la variable auxiliar
      }
    });

    setTall(matchingTall); // Actualizar el estado tall con los elementos coincidentes
  };
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Search
          category
          onSearchChange={handleSearchChange}
          showNoResults={false}
        />
        <TableReport talleInfo={tall} setReportInfo={setReportInfo} />

        <Form.Input
          name="comentario"
          placeholder="Comentario"
          value={formik.values.comentario}
          error={formik.errors.comentario}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          primary
          fluid
          content={"Crear"}
          loading={cargando}
          disabled={cargando}
        />
      </Form>
    </>
  );
}
function initialValues(me, tall) {
  return {
    idUser: me,
    idTaller: tall[0].idTaller,
    comentario: "",
    alerta: true,
  };
}
function newUpdateValidationSchema() {
  return {
    idUser: Yup.number().required(true),
    idTaller: Yup.number().required(true),
    comentario: Yup.string().required(true),
    alerta: Yup.string().required(true),
  };
}
