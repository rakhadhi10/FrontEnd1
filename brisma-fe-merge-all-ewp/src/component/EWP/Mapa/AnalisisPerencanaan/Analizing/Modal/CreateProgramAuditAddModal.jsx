import { Modal, Typography } from "antd";
import React from "react";
import ProgramAuditAdd from "./AnalisaRisk/ProgramAuditAdd";

export const CreateProgramAuditAddModal = ({
  visible,
  onCancel,
  mcrKode,
  data,
}) => {
  return (
    <Modal
      onCancel={onCancel}
      destroyOnClose
      visible={visible}
      centered
      width={1000}
      maskClosable={false}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={"text-gray-700"}>
            Set Risk Issue - Program Audit
          </span>
        </Typography.Title>,
      ]}
    >
      <ProgramAuditAdd mcrKode={mcrKode} data={data} />
    </Modal>
  );
};
