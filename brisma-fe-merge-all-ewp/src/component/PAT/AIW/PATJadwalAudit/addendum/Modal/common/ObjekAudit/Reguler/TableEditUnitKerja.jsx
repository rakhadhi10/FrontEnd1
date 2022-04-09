import { connect } from "react-redux";
import { updateRowBranch } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import { getRows } from "../../../../../../../../../store/ducks/AddendumPATAIWJadwalAudit/selectors";
import TableEditUnitKerja from "../../../../../common/Modal/common/ObjekAudit/Reguler/TableEditUnitKerja";

function TableEditUnitKerjaNormal(props) {
  return <TableEditUnitKerja {...props} />
}

const mapStateToProps = state => ({
  rows: getRows(state),
})

const mapDispatchToProps = {
  updateRows: updateRowBranch
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEditUnitKerjaNormal)