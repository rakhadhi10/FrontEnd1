import { connect } from "react-redux";
import { getUserRoleCodes } from "../../../../../../store/ducks/auth/selectors";
import { getStatusCode } from "../../../../../../store/ducks/PATDocument/selectors";
import FormApproverPusat from "./FormApproverPusat";
import MockFormApproverPusat from "./MockFormApproverPusat";
import StatusApproverPusat from "./StatusApproverPusat";

const ApproverPusat = ({
  status_kode,
  makerPusat
}) => {
  return (
    <>
      {(
        status_kode === "1" ||
        status_kode === "2" ||
        status_kode === "3"
      )
        && <MockFormApproverPusat />
      }
      {status_kode === "4" &&
        (
          <>
            {makerPusat ? <FormApproverPusat /> : <MockFormApproverPusat />}
          </>
        )
      }
      {
        (
          status_kode === "5" ||
          status_kode === "6" ||
          status_kode === "7"
        )
        && <StatusApproverPusat />
      }
    </>
  )
}

const mapStateToProps = state => {
  const makerPusat = getUserRoleCodes(state).includes("2") || getUserRoleCodes(state).includes(2)
  return {
    status_kode: getStatusCode(state),
    makerPusat
  }
}


export default connect(mapStateToProps)(ApproverPusat)