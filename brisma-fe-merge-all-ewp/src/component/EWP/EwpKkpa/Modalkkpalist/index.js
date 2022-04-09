import { Button, Modal, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { compose } from "redux";
import { memo, useState } from "react";
import { connect } from "react-redux";
import { tryApproval, tryNa } from "../../../../store/ducks/EWP/KKPA/aprovalnakkpa/action";

const { TextArea } = Input;
export function ModalApprovalKkpaList({
  show,
  reject = false,
  cancelModal,
  info_kkpa,
  send_approval,
  state_approval,
  send_na,
}) {
  const id_kkpa = info_kkpa && info_kkpa.kkpa.id;
  const [na, setNa] = useState("");

  const updateNa = () => {
    send_na(id_kkpa, na);

    setNa("");
  };

  return (
    <Modal
      title={reject ? "NA KKPA" : "Send Aproval"}
      visible={show}
      onCancel={(e) => cancelModal(e)}
      footer={null}
      width={800}
    >
      <div className="flex flex-col md:flex-row lg:flex-row space-x-5 py-3">
        <div className="w-full md:w-96 lg:w-96">
          <div className="border border-primary-blue  rounded-lg">
            <div className="header border-b border-primary-blue h-10 px-3 py-2 flex flex-row justify-between">
              <p className="text-primary-blue text-sm font-bold">Info KKPA</p>
              <CheckCircleOutlined className="text-primary-blue" />
            </div>
            <div className="flex flex-col space-y-1 p-5">
              <div className="text-sm text-secondary-light-black w-full">
                [ {info_kkpa && info_kkpa.kkpa.auditor.posisi} ]{" "}
                {info_kkpa && info_kkpa.kkpa.auditor.pn} {info_kkpa && info_kkpa.kkpa.auditor.name}
              </div>
              <div className="text-sm text-secondary-light-black">
                {info_kkpa && info_kkpa.risk_issue.kode} - {info_kkpa && info_kkpa.risk_issue.name}
              </div>
              <div className="text-sm text-secondary-light-black">
                {info_kkpa && info_kkpa.sub_major.kode} - {info_kkpa && info_kkpa.sub_major.name}
              </div>
              <div className="text-sm text-secondary-light-black">
                {info_kkpa && info_kkpa.sub_aktivitas.name}
              </div>
              <div className="text-sm text-secondary-light-black">
                {info_kkpa && info_kkpa.aktivitas.name}
              </div>
              <div className="text-sm text-secondary-light-black">
                {info_kkpa && info_kkpa.uker.name}
              </div>
              <div className="flex justify-start items-center gap-2">
                <div
                  className={`bg-secondary-light-green px-1 py-1 text-primary-gray rounded-3xl text-xs`}
                >
                  {info_kkpa && info_kkpa.kkpa.status_persetujuan_kkpa.name}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full space-y-10">
          <h1 className="text-2xl text-secondary-light-black">
            Apakah anda yakin untuk{" "}
            {reject ? "tidak melakukan audit terhadap" : "mengirim approval terhadap"} KKPA tersebut
            ?
          </h1>
          <div className="space-y-1">
            {reject ? (
              <TextArea
                onChange={(e) => setNa(e.target.value)}
                rows={4}
                className="w-full bg-secondary-gray text-secondary-light-black rounded-xl px-5 py-2 h-32  focus:outline-none"
                placeholder="Autosize height with minimum and maximum number of lines"
              />
            ) : null}
            {state_approval.message}
          </div>
          {reject ? (
            <Button
              onClick={() => updateNa()}
              className={
                reject
                  ? `bg-red-500 text-white h-10 w-24 hover:text-black float-right`
                  : `bg-secondary-green text-white h-10 w-24 hover:text-black float-right`
              }
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => send_approval(id_kkpa)}
              className={
                reject
                  ? `bg-red-500 text-white h-10 w-24 hover:text-black float-right`
                  : `bg-secondary-green text-white h-10 w-24 hover:text-black float-right`
              }
            >
              Send
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  info_kkpa: state.kkpa_info.info_kkpa,
  state_approval: state.approval_kkpa,
});

const mapDispatchToProps = {
  send_approval: tryApproval,
  send_na: tryNa,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ModalApprovalKkpaList);
