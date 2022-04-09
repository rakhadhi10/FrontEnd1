import { Modal, Typography } from "antd";
import React from "react";
import BreadCrumbMapaSample from "./MapaSample/BreadCrumbMapaSample";
import FormSampleInfo from "./MapaSample/FormSampleInfo";
import { TabMapaSample } from "./MapaSample/TabMapaSample";

export const CreateMapaSampleModal = ({ visible, onCancel, mcrKode, data }) => {
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
          <span className={"text-gray-700"}>Sample</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <BreadCrumbMapaSample />
        <FormSampleInfo mcr_id={mcrKode} />
        <TabMapaSample mcrKode={mcrKode} />
      </div>
    </Modal>
  );
};
