import React from 'react';
import { Space, Button } from 'antd';
import { KEY } from 'store/common/constants';
import { PlusOutlined } from '@ant-design/icons';
interface ActionBar {
  handleClickBtn: (action: string) => void;
  isBtnSave: boolean;
  isBtnClose: boolean;
  isBtnAdd: boolean;
  loadingBtn: boolean;
}
const ActionBar: React.FC<ActionBar> = ({ handleClickBtn, isBtnSave, isBtnClose, loadingBtn, isBtnAdd }) => {
  // const  = props;
  return (
    <>
      <div className="d-flex justify-content-end">
        <Space size={40}>
          {isBtnAdd && (
            <Button onClick={() => handleClickBtn(KEY.ADD)} className="btn btn-blue" loading={loadingBtn}>
              <PlusOutlined /> <span></span>
            </Button>
          )}
          {isBtnSave && (
            <>
              <Button onClick={() => handleClickBtn(KEY.SAVE)} className="btn btn-blue" loading={loadingBtn}>
                Lưu
              </Button>
            </>
          )}
          {isBtnClose && (
            <>
              <Button className="btn" onClick={() => handleClickBtn(KEY.CLOSE)}>
                Đóng
              </Button>
            </>
          )}
        </Space>
      </div>
    </>
  );
};
export default ActionBar;
