import { useParams } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Spin, Typography } from "antd";
import AppLayout from "../../../../layouts/AppLayout";
import Ckeditor from "../../../../component/CKEditor";
import MakerInfo from "../../../../component/PAT/common/MakerInfo";
import PrevNextNav from "../../../../component/PrevNextNav";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";
// import { dateToSlashFormat } from "../../../../utils/momentHelpers";
import { getError, getLatarBelakang, getLoading, getSubmitError, getSubmitLoading } from "../../../../store/ducks/AddendumPATLatarBelakang/selectors";
import { fetchLatarBelakang, postLatarBelakang, reset } from "../../../../store/ducks/AddendumPATLatarBelakang/actions";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withAddendum from "../../../routes/hoc/withAddendum";
import AddendumPATBreadcrumb from "../../../../component/AddendumPATBreadcrumb";
import DialogAlasanAddendum from "../../../../component/PAT/common/DialogAlasanAddendum";
import { getMakerAddendum, getMakerAddendumPN } from "../../../../store/ducks/PATProject/selectors";
import { getUserPN } from "../../../../store/ducks/auth/selectors";

const showSuccessNotif = createSuccessNotification("Latar Belakang", "Berhasil menyimpan latar belakang")
const showErrorNotif = createErrorNotification("Latar Belakang", "Gagal menyimpan latar belakang")

let editor = null

export function PATLatarBelakang({
  reset,
  fetchLatarBelakang,
  postLatarBelakang,
  loading,
  error,
  submitLoading,
  submitError,
  content,
  addendum = true,
  makerAddendum: maker,
  isMakerAddendum
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchLatarBelakang(pat_id), [fetchLatarBelakang, pat_id])

  return (
    <AppLayout title="ADDENDUM-PAT" addendum={addendum} breadcrumb={AddendumPATBreadcrumb}>
      <PrevNextNav />
      {loading && <div className="text-center"><Spin /></div>}
      {!loading && error && <div className="text-center">{error}</div>}
      {!loading && !error &&
        <>
          <div className="py-8">
            <MakerInfo
              maker={maker ? `${maker.pn} - ${maker.nama}` : "-"}
            // date_created={dateToSlashFormat(createdAt)}
            // last_updated={dateToSlashFormat(updatedAt)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <Typography.Title level={3} className="font-mulish" style={{ margin: 0 }}>
                <span className={addendum && "text-red-500"}>Latar Belakang dan Tujuan</span>
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
                      createSuccessNotification("Latar Belakang", "Berhasil reset latar belakang")()
                      fetchLatarBelakang(pat_id)
                    } else {
                      createErrorNotification("Latar Belakang", "Gagal reset latar belakang")()
                    }
                    return success
                  }}
                >
                  Reset Default
                </Button>
              </div>
            </div>
            <Ckeditor
              contentData={content}
              handleEditorReady={(ed) => editor = ed}
              disabled={!isMakerAddendum}
            />
            <div className="py-8 flex justify-end items-center gap-4">
              <p className="text-primary-red">{submitError}</p>
              <Button
                type="danger"
                disabled={!isMakerAddendum}
                loading={submitLoading}
                onClick={async () => {
                  DialogAlasanAddendum(async (alasan) => {
                    const success = await postLatarBelakang(pat_id, editor.getData(), alasan)
                    if (success) {
                      showSuccessNotif()
                      fetchLatarBelakang(pat_id)
                    } else {
                      showErrorNotif()
                    }
                    return success
                  })
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        </>
      }
    </AppLayout>
  );
}

const mapStateToProps = (state) => {
  const isMakerAddendum = Number(getMakerAddendumPN(state)) === Number(getUserPN(state))
  return {
    isMakerAddendum,
    makerAddendum: getMakerAddendum(state),
    loading: getLoading(state),
    error: getError(state),
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    content: getLatarBelakang(state)
  }
}

const mapDispatchToProps = {
  fetchLatarBelakang: fetchLatarBelakang,
  postLatarBelakang: postLatarBelakang,
  reset: reset
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  withAddendum,
  connect(mapStateToProps, mapDispatchToProps)
)(PATLatarBelakang)
