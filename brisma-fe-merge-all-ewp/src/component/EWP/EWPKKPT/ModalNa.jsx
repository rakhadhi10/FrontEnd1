import { Button, Modal, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { compose } from "redux";
import { memo, useState } from "react";
import { connect } from "react-redux";

const { TextArea } = Input;
export function ModalNa({
  stateKkptDetail,
  show,
  reject = false,
  cancelModal,
  onNa,
  loadingNa
}) {

  const [na, setNa] = useState("");

  const updateNa = () => {
    onNa(na)
    setNa("");
  };

  return (
    <Modal
      title={<p className="text-red-700 text-lg font-bold">NA KKPT</p>}
      visible={show}
      onCancel={(e) => cancelModal(e)}
      footer={null}
      width={800}
    >
      <div className="flex flex-col md:flex-row lg:flex-row space-x-5 py-3">
        <div className="w-full md:w-96 lg:w-96">
          <div className="border border-primary-blue  rounded-lg">
            <div className="header border-b border-primary-blue h-10 px-3 py-2 flex flex-row justify-between">
              <p className="text-primary-blue text-sm font-bold">Info KKPT</p>
              <CheckCircleOutlined className="text-primary-blue" />
            </div>
            <div className="flex flex-col space-y-1 p-5">
              <div className="text-sm text-red-500 w-full">
                Exemplar No : {stateKkptDetail.data !== null ? stateKkptDetail.data.kkpt.exemplar_no : null}
              </div>
              <div className="text-sm text-secondary-light-black">
                [{stateKkptDetail.data !== null ? stateKkptDetail.data.auditor.posisi.toUpperCase() : null}] {stateKkptDetail.data !== null ? stateKkptDetail.data.auditor.pn : null} - {stateKkptDetail.data !== null ? stateKkptDetail.data.auditor.name : null}
              </div>
              <div className="text-sm text-secondary-light-black">
                {stateKkptDetail.data !== null ? stateKkptDetail.data.risk_issue.kode : null} - {stateKkptDetail.data !== null ? stateKkptDetail.data.risk_issue.name : null}
              </div>
              <div className="text-sm text-secondary-light-black">
                {stateKkptDetail.data !== null ? stateKkptDetail.data.sub_major.kode : null} - {stateKkptDetail.data !== null ? stateKkptDetail.data.sub_major.name : null}
              </div>
              <div className="text-sm text-secondary-light-black">
                {stateKkptDetail.data !== null ? stateKkptDetail.data.sub_aktivitas.name : null}
              </div>
              <div className="text-sm text-secondary-light-black">
                {stateKkptDetail.data !== null ? stateKkptDetail.data.aktivitas.name : null}
              </div>
              <div className="text-sm text-secondary-light-black">
                {stateKkptDetail.data !== null ? stateKkptDetail.data.uker.name : null}
              </div>

            </div>
          </div>
        </div>
        <div className="w-full space-y-10">
          <h1 className="text-2xl text-secondary-light-black">
            Apakah anda yakin merngirim approval terhadapa kkpt tersebut ?
            ?
          </h1>
          <div className="space-y-1">

            <textarea
              value={na}
              onChange={(e) => setNa(e.target.value)}
              rows={4}
              className="w-full bg-secondary-gray text-gray-400 rounded-xl px-5 py-2 h-32  focus:outline-none"
              placeholder="isi alasan NA"
            />

          </div>
          <Button
            loading={loadingNa}
            onClick={updateNa}
            className={`bg-red-600 text-white h-10 w-24 hover:text-black float-right`}
          >
            Reject
          </Button>

        </div>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => ({

  stateKkptDetail: state.kkpt_detail

});



const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ModalNa);


