import { connect } from "react-redux";
import { addPembicara, addPenanggungJawab, goNextStep, goPrevStep, updateFormStepTwoStatus } from "../../../../../../../store/ducks/PATJadwalSBP/actions";
import { getFormStepTwo } from "../../../../../../../store/ducks/PATJadwalSBP/selectors";
import TimSbp from "../../../common/Modal/common/TimSbp";

function TimSbpNormal(props) {
  return <TimSbp {...props} />
}

const mapStateToProps = state => {
  const formStepTwo = getFormStepTwo(state)
  return {
    pembicara: formStepTwo.pn_pembicara,
    penanggung_jawab: formStepTwo.pn_penanggung_jawab
  }
}

const mapDispatchToProps = {
  addPembicara: addPembicara,
  addPenanggungJawab: addPenanggungJawab,
  onFinish: (val) => updateFormStepTwoStatus(true),
  next: goNextStep,
  prev: goPrevStep
}

export default connect(mapStateToProps, mapDispatchToProps)(TimSbpNormal)
