import { connect } from "react-redux";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import RuangLingkupAuditAIKP from "./RuangLingkupAuditAIKP";
import RuangLingkupAuditAITI from "./RuangLingkupAuditAITI";
import RuangLingkupAuditAIW from "./RuangLingkupAuditAIW";

const KNS = "kns"
const AITI = "aiti"
const AIKP = "aikp"

const RuangLingkupAudit = ({ status }) => {
  const { kode } = status
  if (kode.includes(KNS)) return <RuangLingkupAuditAIW />
  if (kode.includes(AITI)) return <RuangLingkupAuditAITI />
  if (kode.includes(AIKP)) return <RuangLingkupAuditAIKP />
  return (
    <div className="flex justify-center">
      <p>Something went wrong</p>
      <p>Kode PAT tidak termasuk dalam KNS/AITI/AIKP</p>
    </div>
  )
}

const mapStateToProps = state => ({ status: getAllStatus(state) })

export default connect(mapStateToProps)(RuangLingkupAudit)
