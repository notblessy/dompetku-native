import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

import * as SecureStore from "expo-secure-store";
import useSWR from "swr";

export const useOptionCategories = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState();

  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");

  const checkToken = async () => {
    try {
      const value = await SecureStore.getItemAsync("accessToken");
      setToken(value);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
    if (message) {
      toast.show(message, {
        type: "danger",
      });
      setMessage(null);
    }
  }, [checkToken, toast]);

  const pathKey = `/categories?name=${name}`;

  const { data: res, error } = useSWR(() => (token ? pathKey : null));

  const onSearch = (name) => {
    setName(name);
  };

  return {
    loading: (!res?.data && !error) || loading,
    data: res?.data || [],
    pagination: res?.pagination,
    onSearch,
  };
};
