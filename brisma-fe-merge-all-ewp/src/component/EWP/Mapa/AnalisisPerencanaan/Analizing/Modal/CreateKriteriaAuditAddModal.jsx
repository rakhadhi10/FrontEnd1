import { Modal, Typography } from "antd";
import React from "react";
import KriteriaAuditAdd from "./AnalisaRisk/KriteriaAuditAdd";

export const CreateKriteriaAuditAddModal = ({
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
            Set Risk Issue - Kriteria Audit
          </span>
        </Typography.Title>,
      ]}
    >
      <KriteriaAuditAdd mcrKode={mcrKode} data={data} />
    </Modal>
  );
};
