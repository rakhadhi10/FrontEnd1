import { Modal, Typography } from "antd";
import CreateProjectEwpSteps from "./Steps";

export default function CreateProjectEwpModal({ visible, handleCancel, handleOk }) {
  return (
    <>
      <Modal
        visible={visible}
        width={1000}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        title={[
          <Typography.Title level={3}>
            <span className="text-primary-blue font-normal">Create Project EWP</span>
          </Typography.Title>,
        ]}
      >
        <CreateProjectEwpSteps closeModal={handleCancel} />
      </Modal>
    </>
  );
}
