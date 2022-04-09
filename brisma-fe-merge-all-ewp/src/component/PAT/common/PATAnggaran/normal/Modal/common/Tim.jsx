import { connect } from "react-redux";
import { addAnggota, goNextStep, goPrevStep, updateFormStepTwoStatus } from "../../../../../../../store/ducks/PATAnggaran/actions";
import { getAnggota } from "../../../../../../../store/ducks/PATAnggaran/selectors";
import { TimSbp } from "../../../common/Modal/common/Tim";

function TimSbpNormal(props) {
  return <TimSbp {...props} />
}

const mapStateToProps = state => ({
  anggota: getAnggota(state)
})

const mapDispatchToProps = {
  addAnggota: addAnggota,
  onFinish: (val) => updateFormStepTwoStatus(true),
  next: goNextStep,
  prev: goPrevStep
}

export default connect(mapStateToProps, mapDispatchToProps)(TimSbpNormal)
