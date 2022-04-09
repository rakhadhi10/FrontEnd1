import React from "react";
import { connect } from "react-redux";
import { fetchAllJadwalAudit, openCreateModal, updateFilterForm, updateSortBy } from "../../../../../store/ducks/PATAIWJadwalAudit/actions";
import CardsJadwalAuditListAIW from "../../../../../component/PAT/AIW/PATJadwalAudit/normal/CardsJadwalAuditListAIW";
import EditJadwalAuditModal from "../../../../../component/PAT/AIW/PATJadwalAudit/normal/Modal/Edit/EditJadwalAuditModal";
import CreateJadwalAuditModal from "../../../../../component/PAT/AIW/PATJadwalAudit/normal/Modal/Create/CreateJadwalAuditModal";
import JadwalAuditLayout from "../../../../../component/PAT/common/PATJadwalAudit/JadwalAuditLayout";

const PATAIWJadwalAudit = (props) => {
  return (
    <JadwalAuditLayout
      {...props}
      uka="aiw"
      createModal={CreateJadwalAuditModal}
      editModal={EditJadwalAuditModal}
      cardsList={CardsJadwalAuditListAIW}
    />
  )
};

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
  updateFilterForm: updateFilterForm,
  updateSortBy: updateSortBy,
  fetchAllJadwalAudit: fetchAllJadwalAudit
}

export default connect(null, mapDispatchToProps)(PATAIWJadwalAudit);
