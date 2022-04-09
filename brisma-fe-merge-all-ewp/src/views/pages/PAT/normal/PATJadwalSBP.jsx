import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import CardSbpList from "../../../../component/PAT/common/PATJadwalSBP/normal/CardSbpList";
import CreateSbpModal from "../../../../component/PAT/common/PATJadwalSBP/normal/Modal/Create/CreateSbpModal";
import EditSbpModal from "../../../../component/PAT/common/PATJadwalSBP/normal/Modal/Edit/EditSbpModal";
import SearchForm from "../../../../component/PAT/common/PATJadwalSBP/normal/SearchForm";
import SortBy from "../../../../component/PAT/common/PATJadwalSBP/normal/SortBy";
import PrevNextNav from "../../../../component/PrevNextNav";
import AppLayout from "../../../../layouts/AppLayout";
import { openCreateModal } from "../../../../store/ducks/PATJadwalSBP/actions";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";

export function PATJadwalSBP({ allowedToWrite, openCreateModal }) {
  return (
    <AppLayout title="PAT">
      <CreateSbpModal />
      <EditSbpModal />
      <PrevNextNav />
      <div className="mt-16">
        <Typography.Title level={3}>Jadwal Consulting</Typography.Title>
      </div>
      <div className="bg-white p-4 my-4">
        <SearchForm />
      </div>
      <div className="pb-4 flex justify-between items-center">
        <Button type="primary" onClick={openCreateModal} style={{ visibility: !allowedToWrite && "hidden" }}>
          Create Jadwal Consulting
        </Button>
        <SortBy />
      </div>
      <CardSbpList />
    </AppLayout>
  );
}

const mapDispatchToProps = {
  openCreateModal: openCreateModal
}

const mapStateToProps = state => {
  const isFinal = getAllStatus(state).status_kode === "7"
  const allowedToWrite = !isFinal
  return { allowedToWrite }
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(PATJadwalSBP)
