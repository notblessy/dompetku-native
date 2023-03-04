import useSWR, { mutate } from "swr";
import { useCallback, useEffect, useState } from "react";
import api from "../utils/api";
import { useToast } from "react-native-toast-notifications";

export const useBudgets = () => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(true);

  const { data = [], error, isValidating } = useSWR("/budgets");

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
      console.log(data);
      setLoading(true);
      try {
        const { data: res } = await api.post("/budgets", data);

        if (res.success) {
          mutate("/budgets");
          toast.show("New budget successfully added!", {
            type: "success",
          });
          setSuccess(true);
        } else {
          toast.show("Error while adding budget!", {
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
    async (budgetId) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete("/budgets", {
          data: [budgetId],
        });

        if (res.success) {
          setMessage({
            type: "success",
            message: "Budget deleted!",
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
