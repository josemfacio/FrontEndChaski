import { useState } from "react";
import {
  serchUserTalleApi,
  addUserTalleApi,
  editUserTalleApi,
} from "../api/userTaller";
import { useAuth } from "./useAuht";
export function useUserTalle() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userTaller, setUserTaller] = useState(null);
  const getSerchUserTaller = async (serch) => {
    try {
      setLoading(true);
      const response = await serchUserTalleApi(serch);
      setUserTaller(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const AddUserTaller = async (serch) => {
    try {
      setLoading(true);
      await addUserTalleApi(serch, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const updateUserTaller = async (id, data) => {
    try {
      setLoading(true);
      const response = await editUserTalleApi(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    AddUserTaller,
    getSerchUserTaller,
    updateUserTaller,
    loading,
    userTaller,
    error,
  };
}
