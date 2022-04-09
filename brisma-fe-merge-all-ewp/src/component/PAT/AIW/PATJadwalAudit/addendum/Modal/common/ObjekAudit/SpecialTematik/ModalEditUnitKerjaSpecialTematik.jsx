import { connect } from "react-redux";
import { closeSpecialTematikModal, updateSpecialTematikRows } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getSpecialTematikRows, getSpesialTematikModal } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import ModalEditUnitKerjaSpecialTematik from "../../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/ModalEditUnitKerjaSpecialTematik";

export function ModalEditUnitKerjaSpecialTematikAIW(props) {
  return <ModalEditUnitKerjaSpecialTematik {...props} />
}

const mapDispatchToProps = {
  closeModal: closeSpecialTematikModal,
  updateRows: updateSpecialTematikRows
}

const mapStateToProps = state => ({
  visible: getSpesialTematikModal(state),
  rows: getSpecialTematikRows(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUnitKerjaSpecialTematikAIW)