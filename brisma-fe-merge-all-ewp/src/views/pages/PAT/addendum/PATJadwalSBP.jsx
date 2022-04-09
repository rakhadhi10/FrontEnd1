import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import AddendumPATBreadcrumb from "../../../../component/AddendumPATBreadcrumb";
import CardSbpList from "../../../../component/PAT/common/PATJadwalSBP/addendum/CardSbpList";
import CreateSbpModal from "../../../../component/PAT/common/PATJadwalSBP/addendum/Modal/Create/CreateSbpModal";
import EditSbpModal from "../../../../component/PAT/common/PATJadwalSBP/addendum/Modal/Edit/EditSbpModal";
import SearchForm from "../../../../component/PAT/common/PATJadwalSBP/addendum/SearchForm";
import SortBy from "../../../../component/PAT/common/PATJadwalSBP/addendum/SortBy";
import PrevNextNav from "../../../../component/PrevNextNav";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";
import AppLayout from "../../../../layouts/AppLayout";
import { fetchAllSbp, openCreateModal, reset } from "../../../../store/ducks/AddendumPATJadwalSBP/actions";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { getMakerAddendumPN } from "../../../../store/ducks/PATProject/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAddendum from "../../../routes/hoc/withAddendum";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";

export function PATJadwalSBP({
  reset,
  fetchAllSbp,
  openCreateModal,
  addendum = true,
  isMakerAddendum
}) {
  const { pat_id } = useParams()

  return (
    <AppLayout title="ADDENDUM-PAT" addendum={addendum} breadcrumb={AddendumPATBreadcrumb}>
      <CreateSbpModal addendum />
      <EditSbpModal addendum />
      <PrevNextNav />
      <div className="flex items-center justify-between mt-16 mb-4">
        <Typography.Title level={3} className="font-mulish" style={{ margin: 0 }}>
          <span className={addendum && "text-red-500"}>Jadwal Consulting</span>
        </Typography.Title>
        <div
          className="flex items-center gap-4"
          style={{ visibility: !addendum && "hidden" }}
        >
          <Button
            type="danger"
            disabled={!isMakerAddendum}
            onClick={async () => {
              const success = await reset(pat_id)
              if (success) {
                createSuccessNotification("Jadwal Consulting", "Berhasil reset jadwal consulting")()
                fetchAllSbp(pat_id)
              } else {
                createErrorNotification("Jadwal Consulting", "Gagal reset jadwal consulting")()
              }
              return success
            }}
          >
            Reset Default
          </Button>
        </div>
      </div>
      <div className="bg-white p-4 my-4">
        <SearchForm />
      </div>
      <div className="pb-4 flex justify-between items-center">
        <Button
          type="primary"
          disabled={!isMakerAddendum}
          onClick={openCreateModal}
        >
          Create Jadwal Consulting
        </Button>
        <SortBy />
      </div>
      <CardSbpList addendum={addendum} />
    </AppLayout>
  );
}

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
  fetchAllSbp: fetchAllSbp,
  reset: reset
}

const mapStateToProps = state => ({
  isMakerAddendum: Number(getUserPN(state)) === Number(getMakerAddendumPN(state))
})

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  withAddendum,
  connect(mapStateToProps, mapDispatchToProps)
)(PATJadwalSBP)
