import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import AnggaranCardsList from "../../../../component/PAT/common/PATAnggaran/normal/AnggaranCardsList";
import BuatAnggaranModal from "../../../../component/PAT/common/PATAnggaran/normal/Modal/Create/BuatAnggaranModal";
import EditAnggaranModal from "../../../../component/PAT/common/PATAnggaran/normal/Modal/Edit/EditAnggaranModal";
import SearchAnggaran from "../../../../component/PAT/common/PATAnggaran/normal/SearchAnggaran";
import SortBy from "../../../../component/PAT/common/PATAnggaran/normal/SortBy";
import PrevNextNav from "../../../../component/PrevNextNav";
import AppLayout from "../../../../layouts/AppLayout";
import { openCreateModal } from "../../../../store/ducks/PATAnggaran/actions";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";

export const PATAnggaranPage = ({ allowedToWrite, openCreateModal }) => {
  return (
    <AppLayout title="PAT">
      <BuatAnggaranModal />
      <EditAnggaranModal />
      <PrevNextNav />
      <div className="mt-16">
        <Typography.Title level={3} className="font-mulish">
          Anggaran
        </Typography.Title>
      </div>
      <SearchAnggaran />
      <div className="py-4 flex justify-between items-center">
        <Button type="primary" onClick={openCreateModal} style={{ visibility: !allowedToWrite && "hidden" }}>
          Buat Anggaran lain-lain
        </Button>
        <SortBy />
      </div>
      <AnggaranCardsList />
    </AppLayout>
  );
};

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
)(PATAnggaranPage)
