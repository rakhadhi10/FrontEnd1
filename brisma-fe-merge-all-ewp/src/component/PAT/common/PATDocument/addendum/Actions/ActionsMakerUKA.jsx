import { Button } from "antd"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { getEselonNumber } from "../../../../../../api/utils"
import { getEselon } from "../../../../../../store/ducks/auth/selectors"
import { createMakerUKA, fetchDocInfo } from "../../../../../../store/ducks/AddendumPATDocument/actions"
import { getFormUka } from "../../../../../../store/ducks/AddendumPATDocument/selectors"
import { createErrorNotification, createSuccessNotification } from "../../../../../utils/notifications"

const showSuccessNotif = createSuccessNotification("Send Approval", "Berhasil mengirim approval")
const showErrorNotif = createErrorNotification("Send Approval", "Gagal mengirim approval")

const ActionsMakerUKA = ({ eselonNumber, canSendApproval, createMakerUKA, fetchDocInfo }) => {
  const { pat_id } = useParams()
  return (
    <>
      <Button type="secondary">Generate</Button>
      <div className="flex items-center gap-4">
        {eselonNumber > 3 &&
          <p className="text-primary-red">Hanya bisa user dengan eselon di atas S3</p>
        }
        <Button type="primary"
          disabled={!canSendApproval}
          onClick={async () => {
            const success = await createMakerUKA(pat_id)
            if (success) {
              showSuccessNotif()
              fetchDocInfo(pat_id)
            } else {
              showErrorNotif()
            }
          }}
        >
          Send Approval
        </Button>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { checkers, signers } = getFormUka(state)
  const empty = signers.length === 0

  let checkersBool = false;
  if (checkers.length === 0) checkersBool = true
  else {
    if (checkersBool[0] === undefined) checkersBool = true
    else {
      checkersBool = checkers.some(c => {
        return (
          c &&
          c.nama &&
          c.jabatan &&
          c.pn
        )
      })
    }
  }

  const signersFilled = signers.some(s => {
    return (
      s &&
      s.nama &&
      s.jabatan &&
      s.pn
    )
  })

  const checkersInSigners = checkers.some(r => {
    if (!r) return false;
    if (typeof r === "string") return false
    return signers.some(s => {
      if (!s) return false;
      if (typeof s === "string") return false
      return s.pn === r.pn
    })
  })

  const eselonNumber = getEselonNumber(getEselon(state))
  const canSendApproval = !empty && signersFilled && eselonNumber <= 3 && !checkersInSigners && checkersBool
  return { canSendApproval, eselonNumber }
}

const mapDispatchToProps = {
  createMakerUKA: createMakerUKA,
  fetchDocInfo: fetchDocInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsMakerUKA);