import { connect } from "react-redux";
import { fetchAllJadwalAudit, openCreateModal, updateFilterForm, updateSortBy } from "../../../../../store/ducks/PATAIKPJadwalAudit/actions";
import CardsJadwalAuditListAIKP from "../../../../../component/PAT/AIKP/PATJadwalAudit/normal/CardsJadwalAuditListAIKP";
import CreateJadwalAuditModalAIKP from "../../../../../component/PAT/AIKP/PATJadwalAudit/normal/Modal/Create/CreateJadwalAuditModalAIKP";
import EditJadwalAuditModalAIKP from "../../../../../component/PAT/AIKP/PATJadwalAudit/normal/Modal/Edit/EditJadwalAuditModalAIKP";
import JadwalAuditLayout from "../../../../../component/PAT/common/PATJadwalAudit/JadwalAuditLayout";

const PATAIKPJadwalAudit = (props) => {
  return (
    <JadwalAuditLayout
      {...props}
      uka="aikp"
      createModal={CreateJadwalAuditModalAIKP}
      editModal={EditJadwalAuditModalAIKP}
      cardsList={CardsJadwalAuditListAIKP}
    />
  )
};

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
  updateFilterForm: updateFilterForm,
  updateSortBy: updateSortBy,
  fetchAllJadwalAudit: fetchAllJadwalAudit
}

export default connect(null, mapDispatchToProps)(PATAIKPJadwalAudit);
