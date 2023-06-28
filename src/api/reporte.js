import { BASE_API } from "../utils/constants";
export async function serchReporteApi(serch) {
  try {
    const url = `${BASE_API}/api/reporte/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addReportApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idUser", data.idUser);
    formData.append("idTaller", data.idTaller);
    formData.append("comentario", data.comentario);
    formData.append("alerta", data.alerta);
    formData.append("fecha", data.fecha);

    const url = `${BASE_API}/api/reporte/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
