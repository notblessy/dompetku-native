import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

import { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from "react-native-toast-notifications";

import useSWR from 'swr';
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

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  console.log(toast)

  const [message, setMessage] = useState(null)
  
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
    if (message) {
      toast.show(message, {
        type: 'danger'
      })
      setMessage(null)
    }
  }, [checkToken, toast]);

  const { data: user } = useSWR(token ? '/profile' : null);

  const [loading, setLoading] = useState(false);

  const onLogin = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const { data: res } = await api.post('/login', data);

        if (res.token && res.success) {
          await store("accessToken", res.token)
          setToken(res.token)
        } else {
          setMessage(res.message)
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
