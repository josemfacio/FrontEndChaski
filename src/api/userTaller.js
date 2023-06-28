import { BASE_API } from "../utils/constants";
export async function serchUserTalleApi(serch) {
  try {
    const url = `${BASE_API}/api/userTalleUser/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addUserTalleApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idTaller", data.idTaller);
    formData.append("idUser", data.idUser);
    const url = `${BASE_API}/api/userTalleUser/`;
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
export async function editUserTalleApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("idTaller", data.idTaller);
    formData.append("idUser", data.idUser);
    const url = `${BASE_API}/api/userTalleUser/${id}/`;
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
