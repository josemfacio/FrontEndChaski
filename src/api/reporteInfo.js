import { BASE_API } from "../utils/constants";
export async function serchReporteInfoApi(serch) {
  try {
    const url = `${BASE_API}/api/reporteInfo/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addReportInfoApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    formData.append("idReporte", data.idReporte);
    formData.append("cantidad", data.cantidad);
    const url = `${BASE_API}/api/reporteInfo/`;
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
