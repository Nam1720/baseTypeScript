import { useCallback, useEffect, useState } from 'react';
import { BaseApi } from 'utils/baseApi';

interface useFetchDetailsModel {
  apiServices: BaseApi;
  id: number;
}

const useFetchDetails = <T>({ apiServices, id }: useFetchDetailsModel, initValue: T) => {
  const [data, setData] = useState<T>(initValue);

  const fetchDataDetails = useCallback(async () => {
    const res = await apiServices.getDetail(Number(id));
    if (res?.data) setData(res.data);
  }, [id, apiServices]);

  useEffect(() => {
    if (id && id !== -1) {
      fetchDataDetails();
    }
    return () => {
      setData(initValue);
    };
  }, [id, fetchDataDetails]);

  return { data, setData, fetchDataDetails };
};

export default useFetchDetails;
