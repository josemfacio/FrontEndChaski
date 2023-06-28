import { BASE_API } from "../utils/constants";

export async function getHerramientasApi() {
  try {
    const url = `${BASE_API}/api/herramientas/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addHerramientasApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("cantidad", data.cantidad);
    formData.append("nombre", data.nombre);
    formData.append("idTaller", data.idTaller);
    formData.append("image", data.image);
    const url = `${BASE_API}/api/herramientas/`;
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
export async function editHerramientasApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("cantidad", data.cantidad);
    formData.append("nombre", data.nombre);
    formData.append("idTaller", data.idTaller);
    if (data.image) formData.append("image", data.image);
    const url = `${BASE_API}/api/herramientas/${id}/`;
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
export async function serchHerramientasApi(serch) {
  try {
    const url = `${BASE_API}/api/herramientas/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function serchPreguntaApi(serch) {
  try {
    const url = `${BASE_API}/api/pregunta/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
