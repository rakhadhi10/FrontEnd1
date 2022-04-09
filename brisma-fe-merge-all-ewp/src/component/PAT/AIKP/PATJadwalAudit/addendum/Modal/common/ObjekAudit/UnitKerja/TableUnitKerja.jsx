import { connect } from "react-redux";
import { openSpecialTematikModal, removeFile, updateSpecialTematikRows, uploadFile } from "../../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/actions";
import { getSpecialTematikRows } from "../../../../../../../../../store/ducks/AddendumPATAIKPJadwalAudit/selectors";
import TableUnitKerjaSpecialTematik from "../../../../../../../common/PATJadwalAudit/Modal/ObjekAudit/TableUnitKerjaSpecialTematik";

const TableUnitKerja = (props) => {
  return <TableUnitKerjaSpecialTematik {...props} />
};

const mapDispatchToProps = {
  openModal: openSpecialTematikModal,
  updateRows: updateSpecialTematikRows,
  uploadFile: uploadFile,
  removeFile: removeFile
}

const mapStateToProps = state => ({ rows: getSpecialTematikRows(state) })

export default connect(mapStateToProps, mapDispatchToProps)(TableUnitKerja)
