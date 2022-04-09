import { connect } from "react-redux";
import { compose } from "redux";
import { fetchRefTeams } from "../../../../store/ducks/reference/actions";
import { getRefTeams } from "../../../../store/ducks/reference/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";
import PATAIKPJadwalAudit from "./AIKP/PATAIKPJadwalAudit";
import PATAITIJadwalAudit from "./AITI/PATAITIJadwalAudit";
import PATAIWJadwalAudit from "./AIW/PATAIWJadwalAudit";

const KNS = "kns"
const AITI = "aiti"
const AIKP = "aikp"

const PATJadwalAudit = ({ status, ...props }) => {
  const { kode } = status

  if (kode.includes(KNS)) return <PATAIWJadwalAudit {...props} />
  if (kode.includes(AITI)) return <PATAITIJadwalAudit {...props} />
  if (kode.includes(AIKP)) return <PATAIKPJadwalAudit {...props} />
  return (
    <div className="flex justify-center">
      <p>Something went wrong</p>
      <p>Kode PAT tidak termasuk dalam KNS/AITI/AIKP</p>
    </div>
  )
}

const mapStateToProps = state => ({
  ref_teams: getRefTeams(state)
})

const mapDispatchToProps = {
  fetchRefTeams: fetchRefTeams
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(PATJadwalAudit)
