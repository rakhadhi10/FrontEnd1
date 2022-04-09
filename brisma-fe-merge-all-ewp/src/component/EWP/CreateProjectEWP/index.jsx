import { Modal, Typography } from "antd";
import React from "react";
import { CreateEWPSteps } from "./CreateEWPSteps";

export const CreateProjectEWP = ({ handleCancel, visible }) => {
  return (
    <Modal
      onCancel={handleCancel}
      visible={visible}
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>Create Project EWP</span>
        </Typography.Title>,
      ]}
    >
      <CreateEWPSteps onCancel={handleCancel} />
    </Modal>
  );
};
