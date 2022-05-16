import { Radio, RadioChangeEvent } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks/hookStore';
import { changeLanguageInput } from 'store/common/commonSlice';

const SwitchLanguage = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.common.languageInput);

  const handleChangeLanguage = (e: RadioChangeEvent) => {
    dispatch(changeLanguageInput(e.target.value));
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      <Radio.Group value={language} buttonStyle="solid" onChange={handleChangeLanguage}>
        <Radio.Button value="vi">Tiếng Việt</Radio.Button>
        <Radio.Button value="en">English</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default SwitchLanguage;
