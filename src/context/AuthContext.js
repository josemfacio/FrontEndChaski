import React, { createContext, useState, useEffect } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});
export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAut] = useState(undefined);
  const { getMe } = useUser();
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        setAut({ token, me });
      } else {
        setAut(null);
      }
    })();
  }, []);

  const login = async (token) => {
    setToken(token);
    const me = await getMe(token);
    setAut({ token, me });
  };
  const logout = () => {
    if (auth) {
      removeToken();
      setAut(null);
    }
  };
  const valueContext = {
    auth,
    login,
    logout,
  };
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
