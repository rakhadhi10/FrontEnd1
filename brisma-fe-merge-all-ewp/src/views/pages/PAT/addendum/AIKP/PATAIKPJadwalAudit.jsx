import { connect } from "react-redux";
import { fetchAllJadwalAudit, openCreateModal, reset, updateFilterForm, updateSortBy } from "../../../../../store/ducks/AddendumPATAIKPJadwalAudit/actions";
import CardsJadwalAuditListAIKP from "../../../../../component/PAT/AIKP/PATJadwalAudit/addendum/CardsJadwalAuditListAIKP";
import CreateJadwalAuditModalAIKP from "../../../../../component/PAT/AIKP/PATJadwalAudit/addendum/Modal/Create/CreateJadwalAuditModalAIKP";
import EditJadwalAuditModalAIKP from "../../../../../component/PAT/AIKP/PATJadwalAudit/addendum/Modal/Edit/EditJadwalAuditModalAIKP";
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
  fetchAllJadwalAudit: fetchAllJadwalAudit,
  reset: reset
}

export default connect(null, mapDispatchToProps)(PATAIKPJadwalAudit);
