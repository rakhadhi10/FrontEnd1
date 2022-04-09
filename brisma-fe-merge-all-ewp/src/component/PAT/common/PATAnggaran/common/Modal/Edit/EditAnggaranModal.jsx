import { Modal, Typography } from "antd";
import AnggaranSteps from "../common/Steps";

export default function EditAnggaranModal({ addendum, visible, handleCancel, currentStep, steps }) {
  return (
    <>
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
            <span className={addendum && "text-red-500"}>Edit Anggaran Lain</span>
          </Typography.Title>,
        ]}
      >
        <AnggaranSteps addendum={addendum} currentStep={currentStep} steps={steps} />
      </Modal>
    </>
  );
}
