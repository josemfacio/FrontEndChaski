import { useState } from "react";
import {
  addTallerInfoApi,
  editTallerInfoApi,
  serchTallerInfoApi,
  serchTallerInfoDataApi,
  serchLimiteCantTalleApi,
  serchDataTalleApi,
} from "../api/tallerInfo";
import { useAuth } from "../hooks/useAuht";
export function useTallerInfo() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [talleInfo, setTalleInfo] = useState(null);
  const getSerchTalleInfo = async (serch) => {
    try {
      setLoading(true);
      const response = await serchTallerInfoApi(serch);
      setLoading(false);
      setTalleInfo(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const addTallerInfo = async (data) => {
    try {
      setLoading(true);
      const res = await addTallerInfoApi(data, auth.token);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const editTalleInfo = async (data) => {
    try {
      setLoading(true);
      await editTallerInfoApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchTalleinfoData = async (serch) => {
    try {
      setLoading(true);
      const response = await serchTallerInfoDataApi(serch);
      setLoading(false);
      setTalleInfo(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchLimiteTalleCant = async (serch) => {
    try {
      setLoading(true);
      const response = await serchLimiteCantTalleApi(serch);
      setLoading(false);
      setTalleInfo(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getSerchDataTalle = async (serch) => {
    try {
      setLoading(true);
      const response = await serchDataTalleApi(serch);
      setLoading(false);
      setTalleInfo(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    addTallerInfo,
    editTalleInfo,
    getSerchTalleInfo,
    getSerchTalleinfoData,
    getSerchLimiteTalleCant,
    getSerchDataTalle,
    loading,
    talleInfo,
    error,
  };
}
