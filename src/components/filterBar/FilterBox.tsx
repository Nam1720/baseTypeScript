import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Button, Divider, Input, Popover, Space } from 'antd';
import { useAppDispatch } from 'hooks/hookStore';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './filter-box.scss';

interface FilterBoxProps {
  dropdownRender: JSX.Element;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  params?: any;
  setParamsFilter?: ActionCreatorWithPayload<any | any>;
}

const FilterBox: React.FC<FilterBoxProps> = (props) => {
  const { dropdownRender, visible, setVisible, params, setParamsFilter } = props;
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) setSearch(search);
  }, []);

  useEffect(() => {
    if (search === '' && setParamsFilter) dispatch(setParamsFilter({ ...params, search: '' }));
  }, [search]);

  return (
    <div className="filter-box">
      <Input
        className="filter-box__input"
        allowClear
        prefix={
          <Space>
            <Popover
              placement="bottomLeft"
              visible={visible}
              onVisibleChange={(visible: boolean) => {
                setVisible(visible);
              }}
              content={dropdownRender}
              trigger="click"
            >
              <Button type="link" className="color-grey" onClick={() => setVisible(true)} style={{ padding: '0px' }}>
                <span>Lọc</span>
                <span style={{ fontSize: '8px', marginLeft: '5px' }}>
                  <DownOutlined />
                </span>
              </Button>
            </Popover>
            <Divider type="vertical" className="bg-color-border" />
            <span className="color-border">
              <SearchOutlined />
            </span>
          </Space>
        }
        placeholder="Tìm kiếm"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        suffix={
          <Button
            type="primary"
            className="btn btn-blue border-none"
            onClick={() => {
              if (setParamsFilter && params) {
                dispatch(setParamsFilter({ ...params, search }));
              }
            }}
          >
            Tìm
          </Button>
        }
      />
    </div>
  );
};

export default FilterBox;
