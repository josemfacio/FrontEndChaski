import { BASE_API } from "../utils/constants";
export async function getTallerApi() {
  try {
    const url = `${BASE_API}/api/taller/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addTallerApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    const url = `${BASE_API}/api/taller/`;
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
export async function editTallerApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    const url = `${BASE_API}/api/taller/${id}/`;
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
export async function deleteTallerApi(id, token) {
  try {
    const url = `${BASE_API}/api/taller/${id}/`;
    const paramas = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, paramas);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function downloadTallerApi() {
  try {
    const url = `${BASE_API}/api/download-excel/`;
    const params = {
      method: "GET",
      responseType: "blob",
    };

    const response = await fetch(url, params);
    const blob = await response.blob();

    // Crear un objeto URL para el blob
    const blobUrl = URL.createObjectURL(blob);

    // Crear un enlace temporal
    const tempLink = document.createElement("a");
    tempLink.href = blobUrl;
    tempLink.setAttribute("download", "TalleresAlerta.xlsx");

    // Simular un clic en el enlace para descargar el archivo
    tempLink.click();

    // Liberar el objeto URL y eliminar el enlace temporal
    URL.revokeObjectURL(blobUrl);
    tempLink.remove();

    return true;
  } catch (error) {
    throw error;
  }
}
