import { BASE_API } from "../utils/constants";

export async function getLimiteApi() {
  try {
    const url = `${BASE_API}/api/limite/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addLimiteApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    formData.append("idTaller", data.idTaller);
    formData.append("cantidad", data.cantidad);
    const url = `${BASE_API}/api/limite/`;
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
export async function editLimiteApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    formData.append("idTaller", data.idTaller);
    formData.append("cantidad", data.cantidad);
    const url = `${BASE_API}/api/limite/${id}/`;
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
export async function serchLimiteteApi(serch) {
  try {
    const url = `${BASE_API}/api/limite/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function serchLimiteTalleApi(serch) {
  try {
    const url = `${BASE_API}/api/limiteTalle/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
