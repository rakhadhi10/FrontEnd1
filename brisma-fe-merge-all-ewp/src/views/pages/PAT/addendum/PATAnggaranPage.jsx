import { Button, Typography } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import AddendumPATBreadcrumb from "../../../../component/AddendumPATBreadcrumb";
import AnggaranCardsList from "../../../../component/PAT/common/PATAnggaran/addendum/AnggaranCardsList";
import BuatAnggaranModal from "../../../../component/PAT/common/PATAnggaran/addendum/Modal/Create/BuatAnggaranModal";
import EditAnggaranModal from "../../../../component/PAT/common/PATAnggaran/addendum/Modal/Edit/EditAnggaranModal";
import SearchAnggaran from "../../../../component/PAT/common/PATAnggaran/addendum/SearchAnggaran";
import SortBy from "../../../../component/PAT/common/PATAnggaran/addendum/SortBy";
import PrevNextNav from "../../../../component/PrevNextNav";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";
import AppLayout from "../../../../layouts/AppLayout";
import { fetchAnggaran, openCreateModal, reset } from "../../../../store/ducks/AddendumPATAnggaran/actions";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { getMakerAddendumPN } from "../../../../store/ducks/PATProject/selectors";
import { pat_content } from "../../../routes/allowedRoles";
import withAddendum from "../../../routes/hoc/withAddendum";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";

export const PATAnggaranPage = ({
  reset,
  fetchAnggaran,
  openCreateModal,
  addendum = true,
  isMakerAddendum
}) => {
  const { pat_id } = useParams()

  return (
    <AppLayout title="ADDENDUM-PAT" breadcrumb={AddendumPATBreadcrumb}>
      <BuatAnggaranModal addendum={addendum} />
      <EditAnggaranModal addendum={addendum} />
      <PrevNextNav />
      <div className="flex items-center justify-between mt-16 mb-4">
        <Typography.Title level={3} className="font-mulish" style={{ margin: 0 }}>
          <span className={addendum && "text-red-500"}>Anggaran</span>
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
                createSuccessNotification("Kegiatan Lain", "Berhasil reset kegiatan lain")()
                fetchAnggaran(pat_id)
              } else {
                createErrorNotification("Kegiatan Lain", "Gagal reset kegiatan lain")()
              }
              return success
            }}
          >
            Reset Default
          </Button>
        </div>
      </div>
      <SearchAnggaran />
      <div className="py-4 flex justify-between items-center">
        <Button
          type="primary"
          disabled={!isMakerAddendum}
          onClick={openCreateModal}
        >
          Buat Anggaran lain-lain
        </Button>
        <SortBy />
      </div>
      <AnggaranCardsList addendum={addendum} />
    </AppLayout>
  );
};

const mapDispatchToProps = {
  openCreateModal: openCreateModal,
  fetchAnggaran: fetchAnggaran,
  reset: reset,
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
)(PATAnggaranPage)
