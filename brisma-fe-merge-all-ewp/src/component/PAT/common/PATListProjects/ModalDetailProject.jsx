import moment from "moment";
import { Modal, Spin, Typography } from "antd";

const ModalDetailProject = ({
  visible,
  loading,
  error,
  details,
  onCancel
}) => {
  return (
    <Modal
      visible={visible}
      width={1000}
      onCancel={onCancel}
      footer={null}
      centered
      title={[
        <Typography.Title level={2} className="text-center">
          Project Details
        </Typography.Title>,
      ]}
    >
      {loading && <div className="flex justify-center"><Spin /></div>}
      {!loading && error && <div className="flex justify-center">{error}</div>}
      {!loading && !error && visible &&
        <div className="font-mulish text-secondary-light-black space-y-3 mb-8">
          <div className="flex">
            <p className="w-1/6">Nama Project</p>
            <p className="w-5/6">: PAT AIW_Jakarta_3_1_2020</p>
          </div>
          <div className="flex">
            <p className="w-1/6">ID Project</p>
            <p className="w-5/6">: 891284</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Batas Waktu</p>
            <p className="w-5/6">: {moment().format("DD MMMM YYYY")}</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Maker</p>
            <p className="w-5/6">
              : {["Abin", "Abdul", "Abdel"].join(", ")}
            </p>
          </div>
          <div className="flex">
            <p className="w-1/6">Checker</p>
            <p className="w-5/6">: Abun</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Signer</p>
            <p className="w-5/6">: Abon</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Status Project</p>
            <p className="w-5/6">: Dalam pengerjaan oleh Auditor</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Total Adendum</p>
            <p className="w-5/6">: 2</p>
          </div>
        </div>
      }
    </Modal>
  );
};

export default ModalDetailProject;