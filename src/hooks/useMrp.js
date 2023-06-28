import { useState } from "react";
import { serchMrpApi, addMrpApi, getMrpApi, editMrpApi } from "../api/mrp";
import { useAuth } from "../hooks/useAuht";
export function useMrp() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mrp, setMrp] = useState(null);
  const getMrp = async () => {
    try {
      setLoading(true);
      const response = await getMrpApi();
      setLoading(false);
      setMrp(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchMrp = async (serch) => {
    try {
      setLoading(true);
      const response = await serchMrpApi(serch);
      setLoading(false);
      setMrp(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addMrp = async (data) => {
    try {
      setLoading(true);
      await addMrpApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editMrp = async (id, data) => {
    try {
      setLoading(true);
      await editMrpApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    addMrp,
    editMrp,
    getMrp,
    getSerchMrp,
    loading,
    mrp,
    error,
  };
}
