import { Button, Input, Modal, Space } from "antd"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPN } from "../../../../../../store/ducks/auth/selectors";
import { approve, fetchDocInfo, reject, updateAlasan } from "../../../../../../store/ducks/PATDocument/actions";
import { getCheckersPusat, getCheckersUka, getSignersPusat, getSignersUka, getStatusCode } from "../../../../../../store/ducks/PATDocument/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../../../utils/notifications";

const showApprovalSuccessNotif = createSuccessNotification("Approval", "Berhasil mengirim approval")
const showApprovalErrorNotif = createErrorNotification("Approval", "Gagal mengirim approval")

const showRejectionSuccessNotif = createSuccessNotification("Rejection", "Berhasil mengirim rejection")
const showRejectionErrorNotif = createErrorNotification("Rejection", "Gagal mengirim rejection")

const ActionsSC = ({ fetchDocInfo, updateAlasan, reject, approve, canApprove }) => {
  const { pat_id } = useParams()

  return (
    <>
      <Button
        type="secondary"
        disabled={!canApprove}
        onClick={() => Modal.confirm(
          {
            title: <p className="pb-2 text-primary-red text-center border-b border-gray-500">Reject</p>,
            icon: null,
            centered: true,
            content:
              <div className="mt-4">
                <Space direction="vertical" className="w-full">
                  <p>Alasan Reject</p>
                  <Input.TextArea rows={4} onChange={(e) => updateAlasan(e.target.value)} />
                </Space>
              </div>,
            okText: "Yes",
            async onOk() {
              const success = await reject(pat_id)
              if (success) {
                showRejectionSuccessNotif()
                fetchDocInfo(pat_id)
              } else {
                showRejectionErrorNotif()
              }
            },
            cancelText: "No",
            cancelButtonProps: { type: "danger" },
          })
        }
      >
        Reject
      </Button>
      <Button
        type="primary"
        disabled={!canApprove}
        onClick={() => Modal.confirm(
          {
            title: <p className="pb-2 text-primary-green text-center border-b border-gray-500">Approve</p>,
            icon: null,
            centered: true,
            content:
              <div className="mt-4">
                <Space direction="vertical" className="w-full">
                  <p>Alasan Approve</p>
                  <Input.TextArea rows={4} onChange={(e) => updateAlasan(e.target.value)} />
                </Space>
              </div>,
            okText: "Yes",
            async onOk() {
              const success = await approve(pat_id)
              if (success) {
                showApprovalSuccessNotif()
                fetchDocInfo(pat_id)
              } else {
                showApprovalErrorNotif()
              }
            },
            cancelText: "No",
            cancelButtonProps: { type: "danger" },
          })
        }
      >
        Approve
      </Button>
    </>
  )
}

const mapDispatchToProps = {
  updateAlasan: updateAlasan,
  reject: reject,
  approve: approve,
  fetchDocInfo: fetchDocInfo
}

const mapStateToProps = state => {
  const currentLoginPN = getUserPN(state)
  let currentApproverPN;
  const status_kode = getStatusCode(state)
  if (status_kode === "2") {
    const checkers = getCheckersUka(state)
    const currentChecker = checkers.find(c => !c.is_checked)
    currentApproverPN = currentChecker ? currentChecker.pn : 0
  } else if (status_kode === "3") {
    const signers = getSignersUka(state)
    const currentSigner = signers.find(c => !c.is_signed)
    currentApproverPN = currentSigner ? currentSigner.pn : 0
  } else if (status_kode === "5") {
    const checkers = getCheckersPusat(state)
    const currentChecker = checkers.find(c => !c.is_checked)
    currentApproverPN = currentChecker ? currentChecker.pn : 0
  } else if (status_kode === "6") {
    const signers = getSignersPusat(state)
    const currentSigner = signers.find(c => !c.is_signed)
    currentApproverPN = currentSigner ? currentSigner.pn : 0
  }
  const canApprove = Number(currentLoginPN) === Number(currentApproverPN)
  return { canApprove }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsSC);