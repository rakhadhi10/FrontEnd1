import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, message } from "antd";
import { ConfirmationModal } from "../ConfirmationModal";
import { getApprovalDetail } from "../../../../store/ducks/EWP/ApprovalDetail/selectors";
import { postApprovalEwp } from "../../../../store/ducks/EWP/Approval/actions";
import { connect } from "react-redux";
import { compose } from "redux";
const InputBlock = ({ text }) => {
  return (
    <input
      type="text"
      className="bg-gray-800 text-white px-4 py-1 text-sm block"
      autoComplete="off"
      value={text}
      disable
    />
  );
};
function PenggantianKTA({ onCancel, dataDetail, postApprovalEwp }) {
  const navigate = useNavigate();
  const [modalProps, setmodalProps] = useState({
    visible: false,
    approved: false,
  });

  const destroyAll = () => {
    onCancel();
    setmodalProps({ approved: false, visible: false });
    navigate("/ewp");
  };
  return (
    <>
      <ConfirmationModal
        type={modalProps.approved ? "approve" : "reject"}
        destroyAll={destroyAll}
        visible={modalProps.visible}
        handleOnCancel={() =>
          setmodalProps({ approved: false, visible: false })
        }
        handleOnOk={async (e) => {
          console.log(e);
          let body = {
            id: dataDetail.id,
            is_approved: modalProps.approved,
            approval_desc: e.approval_desc,
          };

          if (!modalProps.approved) {
            body = {
              ...body,
              pn_kta_requester: e.kta.pn,
              nama_kta_requester: e.kta.nama,
            };
          }

          const success = await postApprovalEwp(body);
          if (success) {
            message.success(
              modalProps.approved
                ? "Approval Succesfull!"
                : "Reject Succesfull!"
            );
            onCancel();
          } else {
            message.error("Error");
          }
        }}
      />
      <div className="text-3xl mb-8 text-primary-green font-semibold">
        Penggantian KTA Pada Realisasi EWP
      </div>
      <div className="flex flex-col gap-8">
        <div className="rounded-lg border border-primary-blue text-primary-blue">
          <div className="border-b border-primary-blue text-lg py-1 px-12">
            Info Pengajuan Realisasi EWP
          </div>
          <div className="px-12 py-3">
            <div className="flex justify-start gap-8 text-lg">
              <div className="flex flex-col gap-4 justify-start">
                <p>Yang Mengajukan</p>
                <p>Tanggal Mengajukan</p>
              </div>
              <div className="flex flex-col gap-4 justify-start text-black">
                <p>
                  {dataDetail.pn_yang_mengajukan} -{" "}
                  {dataDetail.nama_yang_mengajukan}
                </p>
                <p>
                  {moment(dataDetail.tanggal_mengajukan).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-primary-blue text-primary-blue">
          <div className="px-12 py-3">
            <div className="flex justify-start gap-8 text-lg">
              <div className="flex flex-col gap-4 justify-start w-2/3">
                <p>Nama Project</p>
                <p>Tahun Audit</p>
                <p>Ketua Tim Audit Berdasarkan PAT</p>
                <p>Ketua Tim Audit Pengganti</p>
              </div>
              <div className="flex flex-col gap-4 justify-start text-black w-full">
                <InputBlock text={dataDetail.nama_project} />
                <InputBlock text={dataDetail.tahun_audit} />
                <InputBlock
                  text={dataDetail.pn_kta_pat + " - " + dataDetail.nama_kta_pat}
                />
                <InputBlock
                  text={
                    dataDetail.pn_kta_pengganti +
                    " - " +
                    dataDetail.nama_kta_pengganti
                  }
                />
              </div>
            </div>
            <div className="flex flex-row gap-10 justify-center mb-8 mt-16">
              <Button
                type="primary"
                onClick={() =>
                  setmodalProps({ approved: false, visible: true })
                }
                danger
              >
                Reject
              </Button>
              <Button
                type="primary"
                onClick={() => setmodalProps({ approved: true, visible: true })}
                className="text-white bg-primary-green hover:bg-white hover:text-primary-green hover:border-primary-green"
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dataDetail: getApprovalDetail(state),
  };
};
const mapDispachToProps = {
  postApprovalEwp: postApprovalEwp,
};

export default compose(connect(mapStateToProps, mapDispachToProps))(
  PenggantianKTA
);
