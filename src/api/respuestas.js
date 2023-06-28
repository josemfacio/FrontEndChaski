import { BASE_API } from "../utils/constants";
export async function serchRespuestaApi(serch) {
  try {
    const url = `${BASE_API}/api/respuesta/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addRespuestaApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idUser", data.idUser);
    formData.append("idHerramienta", data.idHerramienta);
    formData.append("comentario", data.comentario);
    formData.append("funciona", data.funciona);
    const url = `${BASE_API}/api/respuesta/`;
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

export async function addRespuestaInfoApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idRespuesta", data.idRespuesta);
    formData.append("idPregunta", data.idPregunta);
    formData.append("respueta", data.respueta);
    const url = `${BASE_API}/api/infoRespuesta/`;
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

export async function serchRespuestaInfoApi(serch) {
  try {
    const url = `${BASE_API}/api/infoRespuesta/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
