import { BASE_API } from "../utils/constants";

export async function getMuletosApi() {
  try {
    const url = `${BASE_API}/api/muletos/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addMuletosApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("cantidad", data.cantidad);
    formData.append("nombre", data.nombre);
    formData.append("idTaller", data.idTaller);
    formData.append("image", data.image);
    formData.append("marca", data.marca);
    formData.append("tipo", data.tipo);
    formData.append("potencia", data.potencia);
    formData.append("rpm", data.rpm);
    formData.append("voltage", data.voltage);
    formData.append("corriente", data.corriente);
    formData.append("estado", data.estado);
    const url = `${BASE_API}/api/muletos/`;
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
export async function editMuletosApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("idTaller", data.idTaller);
    formData.append("estado", data.estado);
    formData.append("marca", data.marca);
    formData.append("tipo", data.tipo);
    formData.append("potencia", data.potencia);
    formData.append("rpm", data.rpm);
    formData.append("voltage", data.voltage);
    formData.append("corriente", data.corriente);
    if (data.image) formData.append("image", data.image);
    const url = `${BASE_API}/api/muletos/${id}/`;
    const params = {
      method: "PATCH",
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
export async function serchMuletosApi(serch) {
  try {
    const url = `${BASE_API}/api/muletos/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
