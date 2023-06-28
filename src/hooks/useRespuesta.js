import { useState } from "react";
import { useAuth } from "../hooks/useAuht";
import {
  addRespuestaApi,
  addRespuestaInfoApi,
  serchRespuestaApi,
  serchRespuestaInfoApi,
} from "../api/respuestas";
export function useRespuesta() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [infoRespuesta, setInfoRespuesta] = useState(null);
  const getSerchRespueta = async (serch) => {
    try {
      setLoading(true);
      const response = await serchRespuestaApi(serch);
      setLoading(false);
      setRespuesta(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchRespuetaInfo = async (serch) => {
    try {
      setLoading(true);
      const response = await serchRespuestaInfoApi(serch);
      setLoading(false);
      setInfoRespuesta(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addRespuesta = async (data) => {
    try {
      setLoading(true);
      const res = await addRespuestaApi(data, auth.token);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addRespuestaInfo = async (data) => {
    try {
      setLoading(true);
      await addRespuestaInfoApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getSerchRespueta,
    getSerchRespuetaInfo,
    addRespuesta,
    addRespuestaInfo,
    loading,
    respuesta,
    infoRespuesta,
    error,
  };
}
