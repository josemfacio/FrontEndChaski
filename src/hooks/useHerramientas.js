import { useState } from "react";
import {
  serchHerramientasApi,
  serchPreguntaApi,
  addHerramientasApi,
  getHerramientasApi,
  editHerramientasApi,
} from "../api/herramientas";
import { useAuth } from "../hooks/useAuht";
export function useHerramientas() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [herramientas, setHerramientas] = useState(null);
  const getHerramientas = async () => {
    try {
      setLoading(true);
      const response = await getHerramientasApi();
      setLoading(false);
      setHerramientas(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchHerramientas = async (serch) => {
    try {
      setLoading(true);
      const response = await serchHerramientasApi(serch);
      setLoading(false);
      setHerramientas(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addHerramientas = async (data) => {
    try {
      setLoading(true);
      await addHerramientasApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editHerramientas = async (id, data) => {
    try {
      setLoading(true);
      await editHerramientasApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchPregunta = async (serch) => {
    try {
      setLoading(true);
      const response = await serchPreguntaApi(serch);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    addHerramientas,
    getHerramientas,
    editHerramientas,
    getSerchHerramientas,
    getSerchPregunta,
    loading,
    herramientas,
    error,
  };
}
