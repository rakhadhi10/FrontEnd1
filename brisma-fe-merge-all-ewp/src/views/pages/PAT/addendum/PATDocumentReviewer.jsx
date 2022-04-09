import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Spin, Typography } from "antd";
import AppLayout from "../../../../layouts/AppLayout";
import PrevNextNav from "../../../../component/PrevNextNav";
import ApproverUKA from "../../../../component/PAT/common/PATDocument/addendum/ApproverUKA";
import Actions from "../../../../component/PAT/common/PATDocument/addendum/Actions";
import ApproverPusat from "../../../../component/PAT/common/PATDocument/addendum/ApproverPusat";
import DocumentViewer from "../../../../component/PAT/common/PATDocument/addendum/DocumentViewer";
import { fetchDocInfo } from "../../../../store/ducks/AddendumPATDocument/actions";
import { getInfoError, getInfoLoading } from "../../../../store/ducks/AddendumPATDocument/selectors";
import AddendumPATBreadcrumb from "../../../../component/AddendumPATBreadcrumb";

function PATDocumentReviewer({
  loading,
  error,
  fetchDocInfo,
  addendum = true
}) {
  const { pat_id } = useParams()

  useEffect(() => fetchDocInfo(pat_id), [fetchDocInfo, pat_id])

  return (
    <AppLayout title="ADDENDUM-PAT" addendum={addendum} breadcrumb={AddendumPATBreadcrumb}>
      <PrevNextNav />
      <div className="mt-16">
        <Typography.Title level={3}>
          <span className={addendum && "text-red-500"}>Dokumen PAT</span>
        </Typography.Title>
      </div>
      {loading && <div className="text-center"><Spin /></div>}
      {error && !loading && <div className="text-cener">{error}</div>}
      {!loading && !error &&
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
    </AppLayout>
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