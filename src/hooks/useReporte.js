import { useState } from "react";
import { serchReporteApi, addReportApi } from "../api/reporte";
import { useAuth } from "../hooks/useAuht";
export function useReporte() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reporte, setReporte] = useState(null);
  const getSerchReporte = async (serch) => {
    try {
      setLoading(true);
      const response = await serchReporteApi(serch);
      setLoading(false);
      setReporte(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addReport = async (data) => {
    try {
      setLoading(true);
      const result = await addReportApi(data, auth.token);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getSerchReporte,
    addReport,
    loading,
    reporte,
    error,
  };
}
