import { Modal, Typography } from "antd";
import React from "react";
import TableCatatanMapa from "./TableCatatanMapa";

export const CreateCatatanModal = ({ visible, handleCancel }) => {
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
          <span className={"text-gray-700"}>Catatan MAPA</span>
        </Typography.Title>,
      ]}
    >
      <TableCatatanMapa />
    </Modal>
  );
};
