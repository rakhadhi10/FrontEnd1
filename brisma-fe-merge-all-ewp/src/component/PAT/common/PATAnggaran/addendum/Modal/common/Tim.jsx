import { connect } from "react-redux";
import { addAnggota, goNextStep, goPrevStep, updateFormStepTwoStatus } from "../../../../../../../store/ducks/AddendumPATAnggaran/actions";
import { getAnggota } from "../../../../../../../store/ducks/AddendumPATAnggaran/selectors";
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
