import { Modal, Typography } from "antd";
import React from "react";
import SetAuditorModal from "./SetAuditorModal";

export const CreateSetAuditorModal = ({ visible, onCancel, mcr_id }) => {
  return (
    <Modal
      onCancel={onCancel}
      key={mcr_id}
      visible={visible}
      destroyOnClose={true}
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>Set Auditor</span>
        </Typography.Title>,
      ]}
    >
      <SetAuditorModal mcr_id={mcr_id} key={mcr_id} />
    </Modal>
  );
};
