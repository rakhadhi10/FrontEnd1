import { connect } from "react-redux";
import { getAllStatus } from "../../../../../../../store/ducks/PATProject/selectors";
import JadwalKegiatanAuditAITI from "./JadwalKegiatanAuditAITI";
import JadwalKegiatanAuditAIWAIKP from "./JadwalKegiatanAuditAIWAIKP";

const KNS = "kns"
const AITI = "aiti"
const AIKP = "aikp"

const JadwalKegiatanAudit = ({ status }) => {
  const { kode } = status

  if (kode.includes(KNS)) return <JadwalKegiatanAuditAIWAIKP />
  if (kode.includes(AITI)) return <JadwalKegiatanAuditAITI />
  if (kode.includes(AIKP)) return <JadwalKegiatanAuditAIWAIKP />
  return (
    <div className="flex justify-center">
      <p>Something went wrong</p>
      <p>Kode PAT tidak termasuk dalam KNS/AITI/AIKP</p>
    </div>
  )
}

const mapStateToProps = state => ({ status: getAllStatus(state) })

export default connect(mapStateToProps)(JadwalKegiatanAudit)
