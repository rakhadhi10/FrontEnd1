import { connect } from "react-redux";
import { closeRegulerModal } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getRegulerModal, getUkerInduk } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import ModalEditUnitKerjaReguler from "../../../../../common/Modal/common/ObjekAudit/Reguler/ModalEditUnitKerjaReguler";
import EditUnitKerjaTable from "./TableEditUnitKerja";

function ModalEditUnitKerjaRegulerNormal(props) {
  return (
    <ModalEditUnitKerjaReguler
      {...props}
      editUnitKerjaTable={<EditUnitKerjaTable />}
    />
  )
}

const mapDispatchToProps = {
  closeRegulerModal: closeRegulerModal,
}

const mapStateToProps = state => ({
  regulerModalVisible: getRegulerModal(state),
  ukerInduk: getUkerInduk(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUnitKerjaRegulerNormal)