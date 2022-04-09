import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Typography } from "antd";
import CardsTimAuditList from "../../../../component/PAT/common/PATTimAudit/normal/CardsTimAuditList";
import CreateTimModal from "../../../../component/PAT/common/PATTimAudit/normal/Modal/CreateTimModal";
import EditTimModal from "../../../../component/PAT/common/PATTimAudit/normal/Modal/EditTimModal";
import SearchForm from "../../../../component/PAT/common/PATTimAudit/normal/SearchForm";
import SortBy from "../../../../component/PAT/common/PATTimAudit/normal/SortBy";
import PrevNextNav from "../../../../component/PrevNextNav";
import AppLayout from "../../../../layouts/AppLayout";
import { openCreateModal } from "../../../../store/ducks/PATTimAudit/actions";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import withPATStatus from "../../../routes/hoc/withPATStatus";

export const PATTimAudit = ({ allowedToWrite, openCreateModal }) => {
  return (
    <AppLayout title="PAT">
      <CreateTimModal />
      <EditTimModal />
      <PrevNextNav />
      <div className="mt-16">
        <Typography.Title level={3} className="font-mulish">
          Tim Audit
        </Typography.Title>
      </div>
      <section className="bg-white p-4 my-4">
        <SearchForm />
      </section>
      <div className="py-4 flex justify-between items-center">
        <Button type="primary" onClick={openCreateModal} style={{ visibility: !allowedToWrite && "hidden" }}>
          Create Tim
        </Button>
        <SortBy />
      </div>
      <CardsTimAuditList />
    </AppLayout>
  );
};

const mapStateToProps = state => {
  const isFinal = getAllStatus(state).status_kode === "7"
  const allowedToWrite = !isFinal
  return { allowedToWrite }
}

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(PATTimAudit)
