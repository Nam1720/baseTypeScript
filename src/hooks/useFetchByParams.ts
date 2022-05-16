import useMountedState from 'hooks/useMountedState';
import { useCallback, useEffect, useState } from 'react';
import { BaseApi } from 'utils/baseApi';

interface useFetchByParamsModel<R> {
  apiServices: BaseApi;
  params: R;
}

const useFetchByParams = <T, R>({ apiServices, params }: useFetchByParamsModel<R>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const isMounted = useMountedState();

  const fetchByParams = useCallback(async () => {
    setLoading(true);
    const res = await apiServices.getByParams(params);
    if (res?.data) setData(res.data);
    setLoading(false);
  }, [apiServices, params]);

  useEffect(() => {
    if (isMounted()) fetchByParams();
    return () => {
      setData([]);
    };
  }, [isMounted, params, fetchByParams]);

  return { data, setData, loading };
};

export default useFetchByParams;
