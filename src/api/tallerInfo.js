import { BASE_API } from "../utils/constants";
export async function getTallerInfoApi() {
  try {
    const url = `${BASE_API}/api/infoTaller/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addTallerInfoApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    formData.append("idTaller", data.idTaller);
    formData.append("cantidad", data.cantidad);
    const url = `${BASE_API}/api/infoTaller/`;
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
export async function editTallerInfoApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idProd", data.idProd);
    formData.append("idTaller", data.idTaller);
    formData.append("cantidad", data.cantidad);
    const url = `${BASE_API}/api/infoTaller/${parseInt(data.id)}/`;
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
export async function serchTallerInfoApi(serch) {
  try {
    const url = `${BASE_API}/api/infoTaller/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function serchTallerInfoDataApi(serch) {
  try {
    const url = `${BASE_API}/api/infoTallerData/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function serchLimiteCantTalleApi(serch) {
  try {
    const url = `${BASE_API}/api/limiteCant/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function serchDataTalleApi(serch) {
  try {
    const url = `${BASE_API}/api/limiteData/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
