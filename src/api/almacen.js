import { BASE_API } from "../utils/constants";
export async function getAlmacenApi() {
  try {
    const url = `${BASE_API}/api/almacen/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addAlmacenApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("material", data.material);
    formData.append("descripcion", data.descripcion);
    formData.append("cantidad", data.cantidad);
    formData.append("cant", data.cantidad);
    formData.append("unidad", data.unidad);
    formData.append("almacen", data.almacen);
    formData.append("estado", data.estado);
    formData.append("coste", data.coste);
    formData.append("ubicacion", data.ubicacion);
    formData.append("estado", data.estado);
    formData.append("maquina", data.maquina);
    formData.append("image", data.image);

    const url = `${BASE_API}/api/almacen/`;
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
export async function editAlmacenApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("cantidad", data.cantidad);
    formData.append("active", data.active);
    formData.append("estado", data.estado);
    formData.append("maquina", data.maquina);
    if (data.image) formData.append("image", data.image);

    const url = `${BASE_API}/api/almacen/${id}/`;
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
export async function editAlmacenApiPed(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("material", data.material);
    formData.append("descripcion", data.descripcion);
    formData.append("cantidad", data.cantidad);
    formData.append("unidad", data.unidad);
    formData.append("almacen", data.almacen);
    formData.append("active", data.active);
    formData.append("coste", data.coste);
    formData.append("ubicacion", data.ubicacion);
    formData.append("estado", data.estado);
    formData.append("maquina", data.maquina);

    const url = `${BASE_API}/api/almacen/${id}/`;
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
export async function deleteAlmacenApi(id, token) {
  try {
    const url = `${BASE_API}/api/almacen/${id}/`;
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

export async function serchAlmacenApi(serch) {
  try {
    const url = `${BASE_API}/api/almacen/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getAlmacenByIdApi(id) {
  try {
    const url = `${BASE_API}/api/almacen/${id}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function serchAlmacenMateApi(serch) {
  try {
    const url = `${BASE_API}/api/almacenMate/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
