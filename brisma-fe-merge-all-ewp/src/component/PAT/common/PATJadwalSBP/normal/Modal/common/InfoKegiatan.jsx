import { connect } from "react-redux";
import moment from "moment";
import { goNextStep, updateFormStepOne, updateFormStepOneStatus } from "../../../../../../../store/ducks/PATJadwalSBP/actions";
import { getFormStepOne } from "../../../../../../../store/ducks/PATJadwalSBP/selectors";
import { backendFormat } from "../../../../../../../utils/momentHelpers";
import InfoKegiatan from "../../../common/Modal/common/InfoKegiatan";

function InfoKegiatanNormal(props) {
  return <InfoKegiatan {...props} />
}

const mapStateToProps = state => {
  const initialValues = { ...getFormStepOne(state) }
  if (initialValues.start_date) initialValues.start_date = moment(initialValues.start_date, backendFormat)
  if (initialValues.end_date) initialValues.end_date = moment(initialValues.end_date, backendFormat)
  return {
    initialValues
  }
}

const mapDispatchToProps = {
  onValuesChange: (changed, all) => updateFormStepOne(all),
  onFinish: (val) => updateFormStepOneStatus(true, val),
  next: goNextStep
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoKegiatanNormal)
