import { connect } from "react-redux";
import moment from "moment";
import { getFormStepOne, getSelectedTipeAudit } from "../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import { goNextStep, updateFormStepOne, updateFormStepOneStatus } from "../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { backendFormat } from "../../../../../../../utils/momentHelpers";
import InfoKegiatan from "../../../common/Modal/common/InfoKegiatan";
import { getRefTeamsAddendum } from "../../../../../../../store/ducks/reference/selectors";
import { fetchRefTeamsAddendum } from "../../../../../../../store/ducks/reference/actions";

const InfoKegiatanNormal = (props) => <InfoKegiatan {...props} />

const mapStateToProps = state => {
  const initialValues = { ...getFormStepOne(state) }
  if (initialValues.start_date) initialValues.start_date = moment(initialValues.start_date, backendFormat)
  if (initialValues.end_date) initialValues.end_date = moment(initialValues.end_date, backendFormat)

  return {
    initialValues,
    selected_tipe_audit_code: getSelectedTipeAudit(state),
    ref_teams: getRefTeamsAddendum(state)
  }
}

const mapDispatchToProps = {
  onValuesChange: (_, val) => updateFormStepOne(val),
  onFinish: () => updateFormStepOneStatus(true),
  next: goNextStep,
  fetchRefTeams: fetchRefTeamsAddendum
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoKegiatanNormal)
