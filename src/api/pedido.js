import { BASE_API } from "../utils/constants";
export async function getPedidosApi() {
  try {
    const url = `${BASE_API}/api/pedidos/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function addPedidosApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("idUser", data.idUser);
    formData.append("estado", false);
    formData.append("ctotal", data.ctotal);
    const url = `${BASE_API}/api/pedidos/`;
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
export async function addInfoPedidosApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("cantidad", data.cantidad);
    formData.append("costo", data.cantidad);
    formData.append("ot", data.ot);
    formData.append("idPedido", data.idPedido);
    formData.append("idInventario", data.id);
    const url = `${BASE_API}/api/infoPedidos/`;
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

export async function editPedidoApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("idUser", data.idUser);
    formData.append("estado", true);
    formData.append("ctotal", data.ctotal);
    const url = `${BASE_API}/api/pedidos/${id}/`;
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
export async function serchPedidoIDApi(serch) {
  try {
    const url = `${BASE_API}/api/infoPedidosIdPedido/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function serchPedidoIDUserApi(serch) {
  try {
    const url = `${BASE_API}/api/pedidosId/?search=${serch}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
