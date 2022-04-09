import { connect } from "react-redux";
import { compose } from "redux";
import AppLayout from "../../../../layouts/AppLayout";
import withAuth from "../../../routes/hoc/withAuth";
import withRole from "../../../routes/hoc/withRole";
import { pat_content } from "../../../routes/allowedRoles";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import { fetchDocumentHistory } from "../../../../store/ducks/PATDocumentHistory/actions";
import { getDocHistory, getDocHistoryError, getDocHistoryLoading } from "../../../../store/ducks/PATDocumentHistory/selectors";
import { Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TableDocumentHistory from "../../../../component/PAT/common/PATDocHistory/TableDocumentHistory";

const PATDocHistory = (props) => {
  const { loading, error, data, fetchDocHistory } = props
  const { pat_id } = useParams()

  useEffect(() => fetchDocHistory(pat_id), [fetchDocHistory, pat_id])

  if (loading) return (
    <AppLayout title="PAT">
      <div className="flex justify-center"><Spin /></div>
    </AppLayout>
  )

  if (error && !loading) return (
    <AppLayout title="PAT">
      <div className="flex justify-center">{error}</div>
    </AppLayout>
  )

  return (
    <AppLayout title="PAT">
      <section className="bg-white p-4 my-4 flex flex-col justify-start text-left">
        <TableDocumentHistory data={data} />
      </section>
    </AppLayout>
  );
};

const mapStateToProps = state => ({
  loading: getDocHistoryLoading(state),
  error: getDocHistoryError(state),
  data: getDocHistory(state)
})

const mapDispatchToProps = {
  fetchDocHistory: fetchDocumentHistory
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  connect(mapStateToProps, mapDispatchToProps)
)(PATDocHistory)
