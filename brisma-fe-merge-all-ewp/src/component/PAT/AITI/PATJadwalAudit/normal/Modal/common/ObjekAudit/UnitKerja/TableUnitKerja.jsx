import { connect } from "react-redux";
import { getRows } from "../../../../../../../../../store/ducks/PATAITIJadwalAudit/selectors";
import { removeFile, updateRowBranch, uploadFile } from "../../../../../../../../../store/ducks/PATAITIJadwalAudit/actions";
import TableUnitKerjaSpecialTematik from "../../../../../common/Modal/common/ObjekAudit/UnitKerja/TableUnitKerja";

const TableUnitKerjaSpecialTematikNormal = (props) => <TableUnitKerjaSpecialTematik {...props} />

const mapDispatchToProps = {
  updateRows: updateRowBranch,
  uploadFile: uploadFile,
  removeFile: removeFile
}

const mapStateToProps = state => ({
  rows: getRows(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableUnitKerjaSpecialTematikNormal)
