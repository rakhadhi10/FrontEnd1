import React from "react";
import { connect } from "react-redux";
import { fetchAllJadwalAudit, openCreateModal, reset, updateFilterForm, updateSortBy } from "../../../../../store/ducks/AddendumPATAIWJadwalAudit/actions";
import CardsJadwalAuditListAIW from "../../../../../component/PAT/AIW/PATJadwalAudit/addendum/CardsJadwalAuditListAIW";
import EditJadwalAuditModal from "../../../../../component/PAT/AIW/PATJadwalAudit/addendum/Modal/Edit/EditJadwalAuditModal";
import CreateJadwalAuditModal from "../../../../../component/PAT/AIW/PATJadwalAudit/addendum/Modal/Create/CreateJadwalAuditModal";
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
  fetchAllJadwalAudit: fetchAllJadwalAudit,
  reset: reset
}

export default connect(null, mapDispatchToProps)(PATAIWJadwalAudit);
