import { useState } from "react";
import {
  serchLimiteteApi,
  serchLimiteTalleApi,
  addLimiteApi,
  getLimiteApi,
  editLimiteApi,
} from "../api/limites";
import { useAuth } from "../hooks/useAuht";
export function useLimite() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [limite, setLimite] = useState(null);
  const getLimite = async () => {
    try {
      setLoading(true);
      const response = await getLimiteApi();
      setLoading(false);
      setLimite(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchLimite = async (serch) => {
    try {
      setLoading(true);
      const response = await serchLimiteteApi(serch);
      setLoading(false);
      setLimite(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchLimiteTalle = async (serch) => {
    try {
      setLoading(true);
      const response = await serchLimiteTalleApi(serch);
      setLoading(false);
      setLimite(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addLimit = async (data) => {
    try {
      setLoading(true);
      const res = await addLimiteApi(data, auth.token);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editLimit = async (id, data) => {
    try {
      setLoading(true);
      await editLimiteApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    addLimit,
    editLimit,
    getLimite,
    getSerchLimite,
    getSerchLimiteTalle,
    loading,
    limite,
    error,
  };
}
