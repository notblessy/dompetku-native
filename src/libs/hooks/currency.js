import useSWR from 'swr';

export const useCurrency = () => {
  const { data = [], error, isValidating } = useSWR('/currencies');

  return {
    data,
    loading: (!error && !data) || isValidating,
  };
};
