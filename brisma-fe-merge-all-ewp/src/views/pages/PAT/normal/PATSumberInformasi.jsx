import { useParams } from "react-router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Spin, Typography } from "antd";
import AppLayout from "../../../../layouts/AppLayout";
import Ckeditor from "../../../../component/CKEditor";
import MakerInfo from "../../../../component/PAT/common/MakerInfo";
import { fetchSumberInformasi, postSumberInformasi } from "../../../../store/ducks/PATSumberInformasi/actions";
import {
  getCreatedAt,
  getError,
  getLatarBelakang,
  getLoading,
  getPIC,
  getSubmitError,
  getSubmitLoading,
  getUpdatedAt
} from "../../../../store/ducks/PATSumberInformasi/selectors";
import PrevNextNav from "../../../../component/PrevNextNav";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import { getUserPN } from "../../../../store/ducks/auth/selectors";
import { createErrorNotification, createSuccessNotification } from "../../../../component/utils/notifications";
import { dateToSlashFormat } from "../../../../utils/momentHelpers";
import { getAllStatus } from "../../../../store/ducks/PATProject/selectors";
import withPATStatus from "../../../routes/hoc/withPATStatus";

const showSuccessNotif = createSuccessNotification("Sumber Informasi", "Berhasil menyimpan sumber informasi")
const showErrorNotif = createErrorNotification("Sumber Informasi", "Gagal menyimpan sumber informasi")

let editor = null

export function PATSumberInformasi({
  fetchSumberInformasi,
  postSumberInformasi,
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

  useEffect(() => fetchSumberInformasi(pat_id), [fetchSumberInformasi, pat_id])

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
            <Typography.Title level={3}>Sumber Informasi</Typography.Title>
            <Ckeditor
              contentData={content}
              handleEditorReady={(ed) => editor = ed}
              disabled={!allowedToWrite}
            />
            <div className="py-8 flex justify-end">
              <p className="text-primary-red">{submitError}</p>
              <Button
                type="primary"
                disabled={!allowedToWrite}
                loading={submitLoading}
                onClick={async () => {
                  const success = await postSumberInformasi(pat_id, editor.getData())
                  if (success) {
                    showSuccessNotif()
                    fetchSumberInformasi(pat_id)
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
  fetchSumberInformasi: fetchSumberInformasi,
  postSumberInformasi: postSumberInformasi
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(PATSumberInformasi)