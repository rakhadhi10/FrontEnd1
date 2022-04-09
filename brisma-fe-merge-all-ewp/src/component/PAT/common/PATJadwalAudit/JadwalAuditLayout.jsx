import { connect } from "react-redux";
import { Button, Typography } from "antd";
import AppLayout from "../../../../layouts/AppLayout";
import SearchJadwalAudit from "../../../../component/PAT/common/PATJadwalAudit/SearchJadwalAudit";
import PrevNextNav from "../../../../component/PrevNextNav";
import SortBy from "../../../../component/PAT/common/PATJadwalAudit/SortBy";
import { getAllStatus, getMakerAddendumPN } from "../../../../store/ducks/PATProject/selectors";
import AddendumPATBreadcrumb from "../../../AddendumPATBreadcrumb";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../utils/notifications";
import { useParams } from "react-router-dom";

const JadwalAuditLayout = ({
  title = "PAT",
  addendum,
  isMakerAddendum,
  isFinalPAT,
  uka,
  openCreateModal,
  updateFilterForm,
  updateSortBy,
  fetchAllJadwalAudit,
  fetchRefTeams,
  ref_teams,
  editModal: EditModal,
  createModal: CreateModal,
  cardsList: CardsList,
  reset,
}) => {

  const { pat_id } = useParams()

  const getCanCreate = () => {
    let canCreate = false
    if (addendum) {
      canCreate = isMakerAddendum
    } else {
      canCreate = !isFinalPAT
    }
    return canCreate
  }

  return (
    <AppLayout title={title} addendum={addendum} breadcrumb={addendum && AddendumPATBreadcrumb}>
      <CreateModal addendum={addendum} />
      <EditModal addendum={addendum} />
      <PrevNextNav />
      <div className="flex items-center justify-between mt-16 mb-4">
        <Typography.Title level={3} className="font-mulish" style={{ margin: 0 }}>
          <span className={addendum && "text-red-500"}>Jadwal Audit</span>
        </Typography.Title>
        <div
          className="flex items-center gap-4"
          style={{ visibility: !addendum && "hidden" }}
        >
          <Button
            type="danger"
            disabled={!getCanCreate()}
            onClick={async () => {
              const success = await reset(pat_id)
              if (success) {
                createSuccessNotification("Jadwal Audit", "Berhasil reset jadwal audit")()
                fetchAllJadwalAudit(pat_id)
              } else {
                createErrorNotification("Jadwal Audit", "Gagal reset jadwal audit")()
              }
              return success
            }}
          >
            Reset Default
          </Button>
        </div>
      </div>
      <SearchJadwalAudit
        uka={uka}
        fetchAllJadwalAudit={fetchAllJadwalAudit}
        updateFilterForm={updateFilterForm}
        fetchRefTeams={fetchRefTeams}
        ref_teams={ref_teams}
      />
      <div className="py-4 flex justify-between items-center">
        <Button
          type="primary"
          onClick={openCreateModal}
          disabled={!getCanCreate()}
        >
          Create Jadwal Audit
        </Button>
        <SortBy updateSortBy={updateSortBy} />
      </div>
      <CardsList addendum={addendum} />
    </AppLayout>
  );
};

const mapStateToProps = state => ({
  isFinalPAT: String(getAllStatus(state).status_kode) === "7",
  isMakerAddendum: Number(getUserPN(state)) === Number(getMakerAddendumPN(state))
})

export default connect(mapStateToProps)(JadwalAuditLayout);