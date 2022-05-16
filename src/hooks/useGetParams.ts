import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { FormInstance } from 'antd/lib/form';
import qs from 'query-string';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { AnyAction, Dispatch } from 'redux';
import { deleteEmptyPropertiesObj, isEmpty } from 'utils/helpers';

interface Props {
  dispatch: Dispatch<AnyAction>;
  form: FormInstance;
  setParamFilter: ActionCreatorWithPayload<any>;
  resetParamsUrl: ActionCreatorWithoutPayload;
}

const useGetParams = ({ dispatch, form, setParamFilter, resetParamsUrl }: Props) => {
  const location = useLocation();
  const isTouched = useRef(true);

  useEffect(() => {
    if (!isTouched.current) return;
    const paramsUrl = qs.parse(location.search, { parseNumbers: true });
    deleteEmptyPropertiesObj(paramsUrl);
    if (isEmpty(paramsUrl)) return;
    dispatch(setParamFilter(paramsUrl));
    form.setFieldsValue({ ...paramsUrl });
    isTouched.current = false;

    return () => {
      isTouched.current = true;
      dispatch(resetParamsUrl());
    };
  }, []);
};

export default useGetParams;
