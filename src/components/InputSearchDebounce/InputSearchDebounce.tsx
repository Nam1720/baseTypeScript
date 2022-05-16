import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ChangeEvent, useRef, useState } from 'react';
import { InputSearchDebounceProps } from './InputSearchDebounceModel';

const InputSearchDebounce: React.FC<InputSearchDebounceProps> = ({ fetchDataByKeyword, placeHolder }) => {
  const [keyword, setKeyword] = useState('');
  const debounceRef = useRef<any>(null);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchDataByKeyword(value);
    }, 600);
  };

  return (
    <Input
      className="border-rd-8"
      value={keyword}
      allowClear
      suffix={<SearchOutlined className="input-icon" />}
      placeholder={placeHolder}
      onChange={onChangeKeyword}
      style={{ width: '40%' }}
    />
  );
};

export default InputSearchDebounce;
