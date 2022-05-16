import useMountedState from 'hooks/useMountedState';
import { useCallback, useEffect, useState } from 'react';
import { BaseApi } from 'utils/baseApi';

interface useFetchAllModel {
  apiServices: BaseApi;
}

const useFetchAll = <T>({ apiServices }: useFetchAllModel) => {
  const [data, setData] = useState<T[]>([]);
  const isMounted = useMountedState();
  const [loading, setLoading] = useState(false);

  const fetchDataAll = useCallback(async () => {
    setLoading(true);
    const res = await apiServices.getAll();
    if (res?.data) setData(res.data);
    setLoading(false);
  }, [apiServices]);

  useEffect(() => {
    if (isMounted()) fetchDataAll();
    return () => {
      setData([]);
    };
  }, [fetchDataAll, isMounted]);

  return { data, fetchDataAll, setData, loading };
};

export default useFetchAll;
