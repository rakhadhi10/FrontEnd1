import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { Button, Typography } from "antd";
import CardsTimAuditList from "../../../../component/PAT/common/PATTimAudit/addendum/CardsTimAuditList";
import CreateTimModal from "../../../../component/PAT/common/PATTimAudit/addendum/Modal/CreateTimModal";
import EditTimModal from "../../../../component/PAT/common/PATTimAudit/addendum/Modal/EditTimModal";
import SearchForm from "../../../../component/PAT/common/PATTimAudit/addendum/SearchForm";
import SortBy from "../../../../component/PAT/common/PATTimAudit/addendum/SortBy";
import PrevNextNav from "../../../../component/PrevNextNav";
import AppLayout from "../../../../layouts/AppLayout";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { fetchAllTimAudit, openCreateModal, reset } from "../../../../store/ducks/AddendumPATTimAudit/actions";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withAddendum from "../../../routes/hoc/withAddendum";
import AddendumPATBreadcrumb from "../../../../component/AddendumPATBreadcrumb";
import { getMakerAddendumPN } from "../../../../store/ducks/PATProject/selectors";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";

export const PATTimAudit = ({
  addendum = true,
  canCreate,
  openCreateModal,
  fetchAllTimAudit,
  reset
}) => {
  const { pat_id } = useParams()

  return (
    <AppLayout title="ADDENDUM-PAT" addendum={addendum} breadcrumb={AddendumPATBreadcrumb}>
      <CreateTimModal addendum={addendum} />
      <EditTimModal addendum={addendum} />
      <PrevNextNav />
      <div className="flex items-center justify-between mt-16">
        <Typography.Title level={3} className="font-mulish" style={{ margin: 0 }}>
          <span className={addendum && "text-red-500"}>Tim Audit</span>
        </Typography.Title>
        <div
          className="flex items-center gap-4"
          style={{ visibility: !addendum && "hidden" }}
        >
          <Button
            type="danger"
            disabled={!canCreate}
            onClick={async () => {
              const success = await reset(pat_id)
              if (success) {
                createSuccessNotification("Tim Audit", "Berhasil reset tim audit")()
                fetchAllTimAudit(pat_id)
              } else {
                createErrorNotification("Tim Audit", "Gagal reset tim audit")()
              }
              return success
            }}
          >
            Reset Default
          </Button>
        </div>
      </div>
      <section className="bg-white p-4 my-4">
        <SearchForm />
      </section>
      <div className="py-4 flex justify-between items-center">
        <Button
          type="primary"
          disabled={!canCreate}
          onClick={openCreateModal}
        >
          Create Tim
        </Button>
        <SortBy />
      </div>
      <CardsTimAuditList addendum={addendum} />
    </AppLayout>
  );
};

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
  fetchAllTimAudit: fetchAllTimAudit,
  reset: reset
}

const mapStateToProps = state => ({
  canCreate: Number(getMakerAddendumPN(state)) === Number(getUserPN(state))
})

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  withAddendum,
  connect(mapStateToProps, mapDispatchToProps)
)(PATTimAudit)
