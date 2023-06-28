import { useState } from "react";
import { serchReporteInfoApi, addReportInfoApi } from "../api/reporteInfo";
import { useAuth } from "../hooks/useAuht";
export function useReporteInfo() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reporteInfo, setReporteInfo] = useState(null);
  const getSerchReporteinfo = async (serch) => {
    try {
      setLoading(true);
      const response = await serchReporteInfoApi(serch);
      setLoading(false);
      setReporteInfo(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addReportInfo = async (data) => {
    try {
      setLoading(true);
      await addReportInfoApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getSerchReporteinfo,
    addReportInfo,
    loading,
    reporteInfo,
    error,
  };
}
