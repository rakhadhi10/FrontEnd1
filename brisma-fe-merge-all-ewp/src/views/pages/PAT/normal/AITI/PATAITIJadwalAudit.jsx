import { connect } from "react-redux";
import { fetchAllJadwalAudit, openCreateModal, updateFilterForm, updateSortBy } from "../../../../../store/ducks/PATAITIJadwalAudit/actions";
import CardsJadwalAuditListAITI from "../../../../../component/PAT/AITI/PATJadwalAudit/normal/CardsJadwalAuditListAITI";
import CreateJadwalAuditModalAITI from "../../../../../component/PAT/AITI/PATJadwalAudit/normal/Modal/Create/CreateJadwalAuditModalAITI";
import EditJadwalAuditModalAITI from "../../../../../component/PAT/AITI/PATJadwalAudit/normal/Modal/Edit/EditJadwalAuditModalAITI";
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
  fetchAllJadwalAudit: fetchAllJadwalAudit
}

export default connect(null, mapDispatchToProps)(PATAITIJadwalAudit);
