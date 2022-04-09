import { Modal, Typography } from "antd";
import SbpSteps from "../common/Steps";

export default function CreateSbpModal({ addendum, visible, handleCancel, currentStep, steps }) {
  return (
    <Modal
      visible={visible}
      width={1000}
      maskClosable={false}
      centered
      destroyOnClose
      onCancel={handleCancel}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={addendum && "text-red-500"}>Buat Jadwal Consulting</span>
        </Typography.Title>,
      ]}
    >
      <SbpSteps addendum={addendum} currentStep={currentStep} steps={steps} />
    </Modal>
  );
}
