import useSWR, { mutate } from "swr";
import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import { useToast } from "react-native-toast-notifications";

export const useWallets = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(true);

  const { data = [], error, isValidating } = useSWR("/wallets");

  useEffect(() => {
    if (message) {
      toast.show(message.message, {
        type: message.type,
      });
      setMessage(null);
    }
  }, [toast]);

  const onAdd = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const { data: res } = await api.post("/wallets", data);

        if (res.success) {
          mutate("/wallets");
          toast.show("New wallet successfully added!", {
            type: "success",
          });
          setSuccess(true);
        } else {
          toast.show("Error while adding wallet!", {
            type: "danger",
          });
          setSuccess(false);
        }
      } catch (error) {
        toast("error", error);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  const onDelete = useCallback(
    async (walletId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete("/wallets", {
          data: [walletId],
        });

        if (res.success) {
          setMessage({
            type: "success",
            message: "Wallet deleted!",
          });
        } else {
          setMessage({
            type: "danger",
            message: "Something went wrong!",
          });
        }
      } catch (error) {
        toast("error", error);
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  return {
    data,
    loading: (!error && !data) || isValidating || loading,
    onAdd,
    onDelete,
    success,
  };
};
