import { Modal, Typography } from "antd";
import React from "react";
import ContentSampleFRDModal from "./ContentSampleFRDModal";

export const CreateContentSampleFRDModal = ({
  visible,
  onCancel,
  mcr_id,
  pool_frd_id,
}) => {
  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      destroyOnClose
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>Content Sample FRD</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <ContentSampleFRDModal mcr_id={mcr_id} pool_frd_id={pool_frd_id} />
      </div>
    </Modal>
  );
};
