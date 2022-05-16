import { FormProps } from 'antd/lib/form';
import { TablePaginationConfig } from 'antd/lib/table';

export const KEY_API_FAIL = 'Error';
export const KEY = {
  SAVE: 'save',
  CLOSE: 'close',
  EDIT: 'edit',
  ADD: 'add',
  DETAIL: 'detail',
  DELETE: 'delete',
  SUCCESS: 'Success',
  ERROR: 'error',
  FAILED: 'failed',
  VI: 'vi',
  EN: 'en',
};

export const DEFAULT_PAGING = { pageIndex: 1, pageSize: 10, totalPage: 1, totalRecords: 12 };

export enum ACTION_CRUD {
  ADD,
  EDIT,
  VIEW,
  NONE,
}

const typeTemplate = '${label} không đúng định dạng';

export const validateMessagesForm = {
  required: '${label} không được bỏ trống',
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
};

export const formDefaultLayout: FormProps = {
  colon: false,
  layout: 'vertical',
  wrapperCol: { span: 24 },
  validateMessages: validateMessagesForm,
  className: 'font-weight-bold',
};

export const initActionModal = { id: -1, type: ACTION_CRUD.NONE, index: -1 };

export const paginationDefaultProps: TablePaginationConfig = {
  pageSizeOptions: ['10', '20', '30', '40'],
  position: ['bottomRight'],
  showSizeChanger: true,
};

// position: ['bottomRight'],
// pageSizeOptions: ['10', '20', '30', '40'],
// showSizeChanger: true,
