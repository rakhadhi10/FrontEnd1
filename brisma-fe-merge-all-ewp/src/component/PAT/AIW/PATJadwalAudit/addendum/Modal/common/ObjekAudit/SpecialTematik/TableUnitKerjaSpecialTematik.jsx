import { connect } from "react-redux";
import { openSpecialTematikModal, updateSpecialTematikRows, uploadFile, removeFile } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getSpecialTematikRows } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import TableUnitKerjaSpecialTematik from "../../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/TableUnitKerjaSpecialTematik";

const TableUnitKerjaSpecialTematikAIW = (props) => {
  return <TableUnitKerjaSpecialTematik {...props} />
};

const mapDispatchToProps = {
  openModal: openSpecialTematikModal,
  updateRows: updateSpecialTematikRows,
  uploadFile: uploadFile,
  removeFile: removeFile
}

const mapStateToProps = state => ({ rows: getSpecialTematikRows(state) })

export default connect(mapStateToProps, mapDispatchToProps)(TableUnitKerjaSpecialTematikAIW)
