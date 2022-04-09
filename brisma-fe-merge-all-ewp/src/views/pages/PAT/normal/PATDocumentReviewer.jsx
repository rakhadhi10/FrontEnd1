import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Spin, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import AppLayout from "../../../../layouts/AppLayout";
import PrevNextNav from "../../../../component/PrevNextNav";
import ApproverUKA from "../../../../component/PAT/common/PATDocument/normal/ApproverUKA";
import Actions from "../../../../component/PAT/common/PATDocument/normal/Actions";
import ApproverPusat from "../../../../component/PAT/common/PATDocument/normal/ApproverPusat";
import DocumentViewer from "../../../../component/PAT/common/PATDocument/normal/DocumentViewer";
import { fetchDocInfo } from "../../../../store/ducks/PATDocument/actions";
import { getInfoError, getInfoLoading } from "../../../../store/ducks/PATDocument/selectors";

function PATDocumentReviewer({
  status,
  loading,
  error,
  fetchDocInfo
}) {
  const { pat_id } = useParams()
  const { status_pat } = status

  useEffect(() => fetchDocInfo(pat_id), [fetchDocInfo, pat_id])

  return (
    <AppLayout title="PAT">
      <PrevNextNav />
      <div className="mt-16 mb-4">
        <div className="flex items-center flex-wrap gap-4">
          <Typography.Title level={3} style={{ margin: 0 }}>Dokumen PAT</Typography.Title>
          {status_pat !== "On Progress" &&
            <Typography.Title level={5} style={{ margin: 0 }}>
              <Link className="flex items-center" to={`/pat/projects/${pat_id}/riwayat-dokumen`}>
                <CopyOutlined />
                Riwayat Dokumen
              </Link>
            </Typography.Title>
          }
        </div>
      </div>
      {loading && <div className="text-center"><Spin /></div>}
      {error && !loading && <div className="text-cener">{error}</div>}
      {
        !loading && !error &&
        <section className="grid grid-cols-2 items-start gap-4">
          <ApproverUKA />
          <ApproverPusat />
        </section>
      }
      <DocumentViewer />
      <section className="grid grid-cols-4 gap-4 pb-8">
        <div />
        <Actions />
      </section>
    </AppLayout >
  );
}

const mapDispatchToProps = {
  fetchDocInfo: fetchDocInfo
}

const mapStateToProps = state => ({
  loading: getInfoLoading(state),
  error: getInfoError(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(PATDocumentReviewer)