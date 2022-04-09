import { Modal, Typography } from "antd";
import React from "react";
import FilterPickSampleMonber from "./ModalPickSampleMonber/FilterPickSampleMonber";
import TablePickSampleMonber from "./ModalPickSampleMonber/TablePickSampleMonber";

export const CreateModalPickSampleMonber = ({ visible, onCancel, mcr_id }) => {
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
          <span className={"text-gray-700"}>Pick Sample Monber</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <div>
          <p>Filter</p>
          <FilterPickSampleMonber />
        </div>
        <div>
          <p>Pool Sample</p>
          <TablePickSampleMonber mcr_id={mcr_id} />
        </div>
      </div>
    </Modal>
  );
};
