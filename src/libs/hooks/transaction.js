import useSWR, { mutate } from "swr";
import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import { useToast } from "react-native-toast-notifications";

export const useTransactions = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(true);
  const [queryType, setQueryType] = useState("");

  const {
    data = [],
    error,
    isValidating,
  } = useSWR(`/transactions?type=${queryType}`);

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
        const { data: res } = await api.post("/transactions", data);

        if (res.success) {
          mutate(`/transactions?type=${queryType}`);
          mutate(`/wallets`);
          mutate(`/budgets`);
          toast.show("New transaction successfully added!", {
            type: "success",
          });
          setSuccess(true);
        } else {
          toast.show("Error while adding transaction!", {
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

  const onFilterType = (type) => {
    setQueryType(type);
  };

  const onDelete = useCallback(
    async (transactionId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete("/transactions", {
          data: [transactionId],
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
    data: data.data,
    loading: (!error && !data) || isValidating || loading,
    onAdd,
    onDelete,
    onFilterType,
    success,
  };
};
