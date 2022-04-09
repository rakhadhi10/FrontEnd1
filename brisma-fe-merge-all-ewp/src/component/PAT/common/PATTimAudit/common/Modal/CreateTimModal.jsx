import { Modal, Typography } from "antd";

export default function CreateTimModal({
  addendum,
  children,
  visible,
  handleCancel,
}) {
  return (
    <Modal
      visible={visible}
      width={1000}
      centered
      maskClosable={false}
      destroyOnClose
      onCancel={handleCancel}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={addendum && "text-red-500"}>Buat Tim Baru</span>
        </Typography.Title>,
      ]}
    >
      {children}
    </Modal>
  );
}
