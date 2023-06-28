import { useState } from "react";
import { serchTallerUserApi, TallerUsersApi } from "../api/tallerUser";
export function useTallerUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tallerUser, setTallerUser] = useState(null);
  const getSerchTalleruser = async (serch) => {
    try {
      setLoading(true);
      const response = await serchTallerUserApi(serch);
      setLoading(false);
      setTallerUser(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getUsersTaller = async () => {
    try {
      setLoading(true);
      const response = await TallerUsersApi();
      setLoading(false);
      setTallerUser(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    getSerchTalleruser,
    getUsersTaller,
    loading,
    tallerUser,
    error,
  };
}
