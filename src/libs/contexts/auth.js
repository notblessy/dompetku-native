import React, { useEffect, useReducer } from 'react';
import useSWR from 'swr';
import { createContext, useContext, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

import api from '../utils/api';

const AuthCtx = createContext({
  loading: false,
  state: null,
  onLogin: () => {},
  onLogout: () => {},
});

async function store(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result
  }
  return null
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const checkToken = async () => {
    try {
      const value = await SecureStore.getItemAsync("accessToken");
      setToken(value);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  // const { data: user } = useSWR(() =>
  //   token ? '/profile' : null
  // );

  const user = token ? {
    id: 1,
    name: "frederich"
  } : null

  const [loading, setLoading] = useState(false);

  const onLogin = useCallback(
    async (data) => {
      setLoading(true);
      try {
        // const { data: res } = await api.post('/login', data);
        const res = {
          token: "asjfnsknfkds",
          success: true
        }

        if (res.token && res.success) {
          await store("accessToken", res.token)
          setToken(res.token)
        } else {
          console.log(res.message)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onLogout = useCallback(
    async () => {
      try {
        await SecureStore.deleteItemAsync("accessToken");
      } catch (error) {
        console.log(error);
      } finally {
        setToken(null);
        setLoading(false);
      }
    }
  )

  return (
    <AuthCtx.Provider value={{ loading, user: user ? user : null, onLogin, onLogout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
