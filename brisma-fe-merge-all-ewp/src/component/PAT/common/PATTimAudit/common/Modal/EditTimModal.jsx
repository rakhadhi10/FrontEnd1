import { Modal, Typography } from "antd";

export default function EditTimModal({
  addendum,
  children,
  visible,
  handleCancel,
}) {
  return (
    <Modal
      visible={visible}
      width={1000}
      centered
      maskClosable={false}
      destroyOnClose
      onCancel={handleCancel}
      footer={null}
      title={[
        <Typography.Title level={2} className="text-center">
          <span className={addendum && "text-red-500"}>Edit Tim</span>
        </Typography.Title>,
      ]}
    >
      {children}
      {/* <TimForm
        addendum={addendum}
        buttonLabel="Simpan Tim"
        closeModal={handleCancel}
        onSubmit={onSubmit}
        submitting={loading}
        footer={
          <div>
            <p className="font-semibold">Mohon isi semua data sebelum ke tahap selanjutnya</p>
            <p className="text-secondary-yellow font-semibold border border-secondary-yellow p-4 my-2">
              Tim audit yang diubah akan mereset anggaran yang berelasi pada pekerja tersebut
            </p>
          </div>
        }
      /> */}
    </Modal>
  );
}