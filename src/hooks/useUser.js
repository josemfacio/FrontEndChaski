import {
  getMeApi,
  getUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
  addUserHerramietnaApi,
} from "../api/user";
import { useState } from "react";
import { useAuth } from "../hooks";
export function useUser() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, SetUsers] = useState(null);

  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);
      SetUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addUser = async (data) => {
    try {
      setLoading(true);
      const response = await addUserApi(data, auth.token);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addUserHerramienta = async (data) => {
    try {
      setLoading(true);
      const response = await addUserHerramietnaApi(data, auth.token);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateUserApi(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    getMe,
    getUsers,
    loading,
    error,
    users,
    addUser,
    addUserHerramienta,
    updateUser,
    deleteUser,
  };
}
