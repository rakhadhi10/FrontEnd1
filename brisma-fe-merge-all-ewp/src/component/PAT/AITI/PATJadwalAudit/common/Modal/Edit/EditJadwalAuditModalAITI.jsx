import React from "react";
import { Modal, Typography } from "antd";
import JadwalSteps from "../common/Steps";

const EditJadwalAuditModalAITI = ({ addendum, visible, currentStep, steps, closeModal }) => {
  return (
    <Modal
      visible={visible}
      width="1200px"
      centered
      maskClosable={false}
      destroyOnClose
      onCancel={closeModal}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={addendum && "text-red-500"}>Edit Jadwal Audit</span>
        </Typography.Title>,
      ]}
    >
      <JadwalSteps addendum={addendum} currentStep={currentStep} steps={steps} />
    </Modal>
  );
};

export default EditJadwalAuditModalAITI
