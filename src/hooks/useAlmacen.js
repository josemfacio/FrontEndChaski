import { useState } from "react";
import {
  addAlmacenApi,
  getAlmacenApi,
  editAlmacenApi,
  editAlmacenApiPed,
  deleteAlmacenApi,
  serchAlmacenApi,
  serchAlmacenMateApi,
  getAlmacenByIdApi,
} from "../api/almacen";
import { useAuth } from "../hooks/useAuht";
export function useAlmacen() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [almacen, setAlmacen] = useState(null);
  const getAlmacen = async () => {
    try {
      setLoading(true);
      const response = await getAlmacenApi();
      setLoading(false);
      setAlmacen(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchAlmacen = async (serch) => {
    try {
      setLoading(true);
      const response = await serchAlmacenApi(serch);
      setLoading(false);
      setAlmacen(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
    return almacen;
  };
  const getSerchAlmacenMate = async (serch) => {
    try {
      setLoading(true);
      const response = await serchAlmacenMateApi(serch);
      setLoading(false);
      setAlmacen(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addAlmacen = async (data) => {
    try {
      setLoading(true);
      await addAlmacenApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editAlmacen = async (id, data) => {
    try {
      setLoading(true);
      await editAlmacenApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editAlmacenPed = async (id, data) => {
    try {
      setLoading(true);
      await editAlmacenApiPed(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const deleteAlmacen = async (id) => {
    try {
      setLoading(true);
      await deleteAlmacenApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getAlmacenById = async (id) => {
    try {
      const product = await getAlmacenByIdApi(id);
      return product;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    almacen,
    error,
    getAlmacen,
    addAlmacen,
    editAlmacen,
    editAlmacenPed,
    deleteAlmacen,
    getSerchAlmacen,
    getAlmacenById,
    getSerchAlmacenMate,
  };
}
