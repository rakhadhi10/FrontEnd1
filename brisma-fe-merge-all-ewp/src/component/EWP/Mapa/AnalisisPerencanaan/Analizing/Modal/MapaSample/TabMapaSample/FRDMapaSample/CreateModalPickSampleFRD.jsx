import { Modal, Typography } from "antd";
import React from "react";
import FilterPickSampleFRD from "./ModalPickSampleFRD/FilterPickSampleFRD";
import TablePickSampleFRD from "./ModalPickSampleFRD/TablePickSampleFRD";

export const CreateModalPickSampleFRD = ({ visible, onCancel, mcr_id }) => {
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
          <span className={"text-gray-700"}>Pick Sample FRD</span>
        </Typography.Title>,
      ]}
    >
      <div className="space-y-4">
        <div>
          <p>Filter</p>
          <FilterPickSampleFRD />
        </div>
        <div>
          <p>Pool FRD</p>
          <TablePickSampleFRD mcr_id={mcr_id} />
        </div>
      </div>
    </Modal>
  );
};
