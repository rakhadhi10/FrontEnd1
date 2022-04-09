import React from "react";
import { Modal, Typography } from "antd";
import JadwalSteps from "../common/Steps";

export const CreateJadwalAuditModalAIKP = ({ addendum, visible, onCancel, currentStep, steps }) => {
  return (
    <Modal
      visible={visible}
      width="1200px"
      centered
      maskClosable={false}
      destroyOnClose
      onCancel={onCancel}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={addendum && "text-red-500"}>Buat Jadwal Audit</span>
        </Typography.Title>,
      ]}
    >
      <JadwalSteps addendum={addendum} steps={steps} currentStep={currentStep} />
    </Modal>
  );
};

export default CreateJadwalAuditModalAIKP