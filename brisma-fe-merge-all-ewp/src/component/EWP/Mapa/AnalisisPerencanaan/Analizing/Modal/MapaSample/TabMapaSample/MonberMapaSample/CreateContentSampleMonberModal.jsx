import { Modal, Typography } from "antd";
import React from "react";
import ContentSampleMonberModal from "./ContentSampleMonberModal";

export const CreateContentSampleMonberModal = ({
  visible,
  onCancel,
  mcr_id,
  pool_monber_id,
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
          <span className={"text-gray-700"}>Content Sample Monber</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <ContentSampleMonberModal
          mcr_id={mcr_id}
          pool_monber_id={pool_monber_id}
        />
      </div>
    </Modal>
  );
};
