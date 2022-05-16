import { Modal, Space, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import './confirm.scss';

const { Text, Title } = Typography;

export const popUpModalConfirmWarning = ({ handleDoSth, title }: { handleDoSth: VoidFunction; title: string }) => {
  Modal.confirm({
    maskClosable: true,
    width: 500,
    title: (
      <div className="full-width text-center">
        <Title level={4}>Cảnh báo</Title>
      </div>
    ),
    content: (
      <Space direction="vertical" className="text-center full-width" size={20}>
        <span style={{ fontSize: '60px' }}>
          <WarningOutlined twoToneColor="#FFC700" className="icon-warning" />
        </span>
        <Text>
          {title} đã xuất quá số lượng hàng tồn, nếu tiếp tục sẽ dẫn đến tồn kho bị âm. Bạn có chắc chắn muốn thực hiện
          việc này?{' '}
        </Text>
      </Space>
    ),
    okText: 'Đồng ý',
    cancelText: 'Hủy',
    okButtonProps: { className: 'btn width-35 text-semibold btn-accept' },
    cancelButtonProps: { className: 'btn width-35 text-semibold btn-cancel' },
    onOk: () => {
      handleDoSth();
    },
  });
};

{
  /* <Button className="btn width-49 btn-cancel">Hủy</Button>
<Button type="ghost" className="btn width-49 btn-error"> */
}
