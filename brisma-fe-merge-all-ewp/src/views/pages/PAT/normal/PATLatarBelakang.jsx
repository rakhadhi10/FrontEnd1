import { useParams } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Spin, Typography } from "antd";
import AppLayout from "../../../../layouts/AppLayout";
import Ckeditor from "../../../../component/CKEditor";
import MakerInfo from "../../../../component/PAT/common/MakerInfo";
import { fetchLatarBelakang, postLatarBelakang } from "../../../../store/ducks/PATLatarBelakang/actions";
import {
  getCreatedAt,
  getError,
  getLatarBelakang,
  getLoading,
  getPIC,
  getSubmitError,
  getSubmitLoading,
  getUpdatedAt
} from "../../../../store/ducks/PATLatarBelakang/selectors";
import PrevNextNav from "../../../../component/PrevNextNav";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";
import { dateToSlashFormat } from "../../../../utils/momentHelpers";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import withPATStatus from "../../../routes/hoc/withPATStatus";

const showSuccessNotif = createSuccessNotification("Latar Belakang", "Berhasil menyimpan latar belakang")
const showErrorNotif = createErrorNotification("Latar Belakang", "Gagal menyimpan latar belakang")

let editor = null

export function PATLatarBelakang({
  fetchLatarBelakang,
  postLatarBelakang,
  loading,
  error,
  submitLoading,
  submitError,
  maker,
  allowedToWrite,
  createdAt,
  updatedAt,
  content
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchLatarBelakang(pat_id), [fetchLatarBelakang, pat_id])

  return (
    <AppLayout title="PAT">
      <PrevNextNav />
      {loading && <div className="text-center"><Spin /></div>}
      {!loading && error && <div className="text-center">{error}</div>}
      {!loading && !error &&
        <>
          <div className="py-8">
            <MakerInfo
              maker={maker ? `${maker.pn} - ${maker.nama}` : "-"}
              date_created={dateToSlashFormat(createdAt)}
              last_updated={dateToSlashFormat(updatedAt)}
            />
          </div>
          <div>
            <Typography.Title level={3}>Latar Belakang dan Tujuan</Typography.Title>
            <Ckeditor
              contentData={content}
              handleEditorReady={(ed) => editor = ed}
              disabled={!allowedToWrite}
            />
            <div className="py-8 flex justify-end items-center gap-4">
              <p className="text-primary-red">{submitError}</p>
              <Button
                type="primary"
                disabled={!allowedToWrite}
                loading={submitLoading}
                onClick={async () => {
                  const success = await postLatarBelakang(pat_id, editor.getData())
                  if (success) {
                    showSuccessNotif()
                    fetchLatarBelakang(pat_id)
                  } else {
                    showErrorNotif()
                  }
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

const mapStateToProps = state => {
  const maker = getPIC(state)
  const status_kode_pat = getAllStatus(state).status_kode
  const isSameMaker = !maker || Number(maker.pn) === Number(getUserPN(state))
  const isFinal = status_kode_pat === "7"
  const allowedToWrite = !isFinal && isSameMaker

  return {
    loading: getLoading(state),
    error: getError(state),
    submitLoading: getSubmitLoading(state),
    submitError: getSubmitError(state),
    maker,
    allowedToWrite,
    createdAt: getCreatedAt(state),
    updatedAt: getUpdatedAt(state),
    content: getLatarBelakang(state)
  }
}

const mapDispatchToProps = {
  fetchLatarBelakang: fetchLatarBelakang,
  postLatarBelakang: postLatarBelakang
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(PATLatarBelakang)
