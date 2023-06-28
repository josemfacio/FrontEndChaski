import { useState } from "react";
import {
  serchMuletosApi,
  addMuletosApi,
  getMuletosApi,
  editMuletosApi,
} from "../api/muletos";
import { useAuth } from "../hooks/useAuht";
export function useMuletos() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [muletos, setMuletos] = useState(null);
  const getMuletos = async () => {
    try {
      setLoading(true);
      const response = await getMuletosApi();
      setLoading(false);
      setMuletos(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchMuletos = async (serch) => {
    try {
      setLoading(true);
      const response = await serchMuletosApi(serch);
      setLoading(false);
      setMuletos(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addMuletos = async (data) => {
    try {
      setLoading(true);
      await addMuletosApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editMuletos = async (id, data) => {
    try {
      setLoading(true);
      await editMuletosApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    addMuletos,
    editMuletos,
    getMuletos,
    getSerchMuletos,
    loading,
    muletos,
    error,
  };
}
