import { connect } from "react-redux";
import { fetchAllJadwalAudit, openCreateModal, reset, updateFilterForm, updateSortBy } from "../../../../../store/ducks/AddendumPATAITIJadwalAudit/actions";
import CardsJadwalAuditListAITI from "../../../../../component/PAT/AITI/PATJadwalAudit/addendum/CardsJadwalAuditListAITI";
import CreateJadwalAuditModalAITI from "../../../../../component/PAT/AITI/PATJadwalAudit/addendum/Modal/Create/CreateJadwalAuditModalAITI";
import EditJadwalAuditModalAITI from "../../../../../component/PAT/AITI/PATJadwalAudit/addendum/Modal/Edit/EditJadwalAuditModalAITI";
import JadwalAuditLayout from "../../../../../component/PAT/common/PATJadwalAudit/JadwalAuditLayout";

const PATAITIJadwalAudit = (props) => {
  return (
    <JadwalAuditLayout
      {...props}
      uka="aiti"
      createModal={CreateJadwalAuditModalAITI}
      editModal={EditJadwalAuditModalAITI}
      cardsList={CardsJadwalAuditListAITI}
    />
  )
};

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
  updateFilterForm: updateFilterForm,
  updateSortBy: updateSortBy,
  fetchAllJadwalAudit: fetchAllJadwalAudit,
  reset: reset
}

export default connect(null, mapDispatchToProps)(PATAITIJadwalAudit);
