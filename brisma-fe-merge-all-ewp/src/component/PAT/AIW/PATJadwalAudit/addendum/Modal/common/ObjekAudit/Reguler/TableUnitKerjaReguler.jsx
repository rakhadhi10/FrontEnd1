import { connect } from "react-redux";
import { openRegulerModal, removeFile, updateRowBranch, uploadFile } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getRows } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import TableUnitKerjaReguler from "../../../../../common/Modal/common/ObjekAudit/Reguler/TableUnitKerjaReguler";

const TableUnitKerjaRegulerNormal = (props) => <TableUnitKerjaReguler {...props} />

const mapDispatchToProps = {
  openRegulerModal: openRegulerModal,
  updateRowBranch: updateRowBranch,
  uploadFile: uploadFile,
  removeFile: removeFile
}

const mapStateToProps = state => ({ rows: getRows(state) })

export default connect(mapStateToProps, mapDispatchToProps)(TableUnitKerjaRegulerNormal)
