import { connect } from "react-redux";
import { compose } from "redux";
import TableDocumentHistory from "../../../../../component/RPM/Monitoring/common/TableDocumentHistory";
import RPMAuditeeBreadcrumb from "../../../../../component/RPMAuditeeBreadcrumb";
import AppLayout from "../../../../../layouts/AppLayout";
import { fetchAllDocuments } from "../../../../../store/ducks/RPMAuditee/actions";
import { getAuditeeDocuments, getAuditeeDocumentsError, getAuditeeDocumentsLoading } from "../../../../../store/ducks/RPMAuditee/selectors";
import withAuth from "../../../../routes/hoc/withAuth";

function RPMDocumentHistory(props) {
  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditeeBreadcrumb}>
      <TableDocumentHistory {...props} />
    </AppLayout>
  );
}

const mapDispatchToProps = {
  fetchAllDocuments: fetchAllDocuments
}

const mapStateToProps = state => ({
  loading: getAuditeeDocumentsLoading(state),
  error: getAuditeeDocumentsError(state),
  data: getAuditeeDocuments(state),
})

export default compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(RPMDocumentHistory)