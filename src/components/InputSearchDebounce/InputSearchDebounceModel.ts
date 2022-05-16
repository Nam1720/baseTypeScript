import { ParamsFilterModel } from 'store/common/interface';
export interface InputSearchDebounceProps {
  fetchDataByKeyword: (searchText: string) => void;
  placeHolder?: string;
  paramsFilter?: ParamsFilterModel;
  keyParams: string;
}
