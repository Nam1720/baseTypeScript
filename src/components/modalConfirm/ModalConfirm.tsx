import { Modal, Space, Typography } from 'antd';
import { CloseCircleTwoTone } from '@ant-design/icons';

const { Text, Title } = Typography;

export const popUpModalConfirm = ({ handleDoSth, title }: { handleDoSth: VoidFunction; title: string }) => {
  Modal.confirm({
    maskClosable: true,
    width: 420,
    title: (
      <div className="full-width text-center">
        <Title level={4}>Xóa {title}</Title>
      </div>
    ),
    content: (
      <Space direction="vertical" className="text-center full-width" size={20}>
        <span style={{ fontSize: '60px' }}>
          <CloseCircleTwoTone twoToneColor="#DB524E" />
        </span>
        <Text>Bạn có chắc chắn muốn xóa {title} ? </Text>
      </Space>
    ),
    okText: 'Xóa',
    cancelText: 'Hủy',
    okButtonProps: { className: 'btn width-45 text-semibold btn-error' },
    cancelButtonProps: { className: 'btn width-45 text-semibold btn-cancel' },
    onOk: () => {
      handleDoSth();
    },
  });
};

{
  /* <Button className="btn width-49 btn-cancel">Hủy</Button>
<Button type="ghost" className="btn width-49 btn-error"> */
}
