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
            <p className="w-5/6">: {details.project.nama_project}</p>
          </div>
          <div className="flex">
            <p className="w-1/6">ID Project</p>
            <p className="w-5/6">: {details.project.num_project}</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Batas Waktu RPM</p>
            <p className="w-5/6">: {moment(details.project.batas_waktu).format("DD MMMM YYYY")}</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Maker</p>
            <p className="w-5/6">
              : {details.project.makers_auditee &&
                details.project.makers_auditee.map(m => m.nama).join(", ")
              }
            </p>
          </div>
          <div className="flex">
            <p className="w-1/6">Checker</p>
            <p className="w-5/6">: {details.project.checkers_auditee &&
              details.project.checkers_auditee.map(c => c.nama).join(", ")}
            </p>
          </div>
          <div className="flex">
            <p className="w-1/6">Signer</p>
            <p className="w-5/6">: {details.project.signers_auditee &&
              details.project.signers_auditee.map(s => s.nama).join(", ")}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex">
              <p className="w-2/6">Total KKPT</p>
              <p className="w-4/6">: </p>
            </div>
            <div className="flex">
              <p className="w-2/6">Evaluasi ke-</p>
              <p className="w-4/6">: {details.project.num_evaluasi}</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex">
              <p className="w-2/6">Total Rekomendasi</p>
              <p className="w-4/6">: {details.total_rekomendasi}</p>
            </div>
            <div className="flex">
              <p className="w-2/6">Total Action Plan</p>
              <p className="w-4/6">: {details.total_action_plan}</p>
            </div>
          </div>
          <div className="flex">
            <p className="w-1/6 pl-3">Minor</p>
            <p className="w-5/6">: {details.minor}</p>
          </div>
          <div className="flex">
            <p className="w-1/6 pl-3">Moderate</p>
            <p className="w-5/6">: {details.moderat}</p>
          </div>
          <div className="flex">
            <p className="w-1/6 pl-3">Major</p>
            <p className="w-5/6">: {details.major}</p>
          </div>
          <div className="flex">
            <p className="w-1/6">Status Project</p>
            <p className="w-5/6">: {details.project.status_project}</p>
          </div>
        </div>
      }
    </Modal>
  );
};

export default ModalDetailProject;