import { useState } from "react";
import { useAuth } from "../hooks/useAuht";
import {
  addPedidosApi,
  editPedidoApi,
  getPedidosApi,
  addInfoPedidosApi,
  serchPedidoIDApi,
  serchPedidoIDUserApi,
} from "../api/pedido";

export function usePedidos() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pedidos, setPedidos] = useState(null);
  const getPediddo = async () => {
    try {
      setLoading(true);
      const response = await getPedidosApi();
      setLoading(false);
      setPedidos(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addPedido = async (data) => {
    try {
      setLoading(true);
      const result = await addPedidosApi(data, auth.token);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editPedidos = async (id, data) => {
    try {
      setLoading(true);
      await editPedidoApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addInfoPedido = async (data) => {
    try {
      setLoading(true);
      const result = await addInfoPedidosApi(data, auth.token);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchPedidoID = async (serch) => {
    try {
      setLoading(true);
      const response = await serchPedidoIDApi(serch);
      setLoading(false);
      setPedidos(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchPedidoIDUser = async (serch) => {
    try {
      setLoading(true);
      const response = await serchPedidoIDUserApi(serch);
      setLoading(false);
      setPedidos(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getPediddo,
    getSerchPedidoID,
    getSerchPedidoIDUser,
    addPedido,
    editPedidos,
    addInfoPedido,
    loading,
    pedidos,
    error,
  };
}
