import { BASE_API } from "../utils/constants";

export async function getMrpApi() {
  try {
    const url = `${BASE_API}/api/mrp/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addMrpApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    formData.append("nombre", data.nombre);
    formData.append("cantidad", data.cantidad);
    const url = `${BASE_API}/api/mrp/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log(response);
    // return result;
  } catch (error) {
    throw error;
  }
}
export async function editMrpApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    const url = `${BASE_API}/api/mrp/${id}/`;
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
export async function serchMrpApi(serch) {
  try {
    const url = `${BASE_API}/api/mrp/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
