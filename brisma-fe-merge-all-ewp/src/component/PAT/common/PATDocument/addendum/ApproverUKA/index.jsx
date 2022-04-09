import { connect } from "react-redux";
import { getEselonNumber } from "../../../../../../api/utils";
import { getEselon } from "../../../../../../store/ducks/auth/selectors";
import { getStatusCode } from "../../../../../../store/ducks/AddendumPATDocument/selectors";
import FormApproverUKA from "./FormApproverUKA";
import MockFormApproverUKA from "./MockFormApproverUKA";
import StatusApproverUKA from "./StatusApproverUKA";

const ApproverUKA = ({
  status_kode,
  eselonNumber
}) => {
  return (
    <>
      {status_kode === "1" &&
        (
          <>
            {eselonNumber <= 3 ? <FormApproverUKA /> : <MockFormApproverUKA />}
          </>
        )
      }
      {(
        status_kode === "2" ||
        status_kode === "3" ||
        status_kode === "4" ||
        status_kode === "5" ||
        status_kode === "6" ||
        status_kode === "7"
      ) &&
        <StatusApproverUKA />
      }
    </>
  )
}

const mapStateToProps = state => ({
  status_kode: getStatusCode(state),
  eselonNumber: getEselonNumber(getEselon(state))
})

export default connect(mapStateToProps)(ApproverUKA)