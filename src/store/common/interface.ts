import { ACTION_CRUD } from './constants';

export interface FilterListInit {
  page: number;
  limit: number;
  keyword: string;
  sort: string;
  column: string;
}

export interface ObjAny {
  [key: string]: any;
}

export interface ParamsFilterModel {
  limit: number;
  page: number;
  total: number;
  direction: string;
  sort: string;
  [name: string]: string | number;
}

export interface actionModal extends ObjAny {
  id?: number;
  index?: number;
  type: ACTION_CRUD;
  isVisible?: boolean;
}

export type Nullable<T> = T | null;

export interface RouteProps {
  path: string;
  name?: string;
  component: React.FC;
  middleware?: any;
}

export const STATUS = {
  IS_ACTIVE: 1,
  NOT_ACTIVE: 0,
};

export interface countryModel {
  id: number;
  country_name: string;
}

export interface provinceModel {
  id: number;
  province_name: string;
}
export interface districtModel {
  id: number;
  district_name: string;
}
