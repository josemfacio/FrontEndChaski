import { useState } from "react";

import {
  addTallerApi,
  editTallerApi,
  getTallerApi,
  deleteTallerApi,
  downloadTallerApi,
} from "../api/taller";
import { useAuth } from "../hooks/useAuht";
export function useTaller() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [taller, setTaller] = useState(null);

  const getTaller = async () => {
    try {
      setLoading(true);
      const response = await getTallerApi();
      setLoading(false);
      setTaller(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addTaller = async (data) => {
    try {
      setLoading(true);
      await addTallerApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editTaller = async (id, data) => {
    try {
      setLoading(true);
      await editTallerApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const deleteTaller = async (id) => {
    try {
      setLoading(true);
      await deleteTallerApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getTallerExcel = async () => {
    try {
      setLoading(true);
      await downloadTallerApi();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getTaller,
    addTaller,
    editTaller,
    deleteTaller,
    loading,
    taller,
    error,
    getTallerExcel,
  };
}
