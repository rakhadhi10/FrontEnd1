import { connect } from "react-redux";
import { closeSpecialTematikModal, updateSpecialTematikRows } from "../../../../../../../../../store/ducks/PATAIKPJadwalAudit/actions";
import { getSpesialTematikModal, getSpecialTematikRows } from "../../../../../../../../../store/ducks/PATAIKPJadwalAudit/selectors";
import ModalEditUnitKerjaSpecialTematik from "../../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/ModalEditUnitKerjaSpecialTematik";

export function ModalEditUnitKerja(props) {
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUnitKerja)