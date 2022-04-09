import { compose } from "redux";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";
import PATAIKPTargetAudit from "./AIKP/PATAIKPTargetAudit";
import PATAITITargetAudit from "./AITI/PATAITITargetAudit";
import PATAIWTargetAudit from "./AIW/PATAIWTargetAudit";

const KNS = "kns"
const AITI = "aiti"
const AIKP = "aikp"

const PATTargetAudit = ({ status }) => {
  const { kode } = status

  if (kode.includes(KNS)) return <PATAIWTargetAudit />
  if (kode.includes(AITI)) return <PATAITITargetAudit />
  if (kode.includes(AIKP)) return <PATAIKPTargetAudit />
  return (
    <div className="flex justify-center">
      <p>Something went wrong</p>
      <p>Kode PAT tidak termasuk dalam KNS/AITI/AIKP</p>
    </div>
  )
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus
)(PATTargetAudit)