import { connect } from "react-redux";
import { compose } from "redux";
import TableDocumentHistory from "../../../../../component/RPM/Monitoring/common/TableDocumentHistory";
import RPMAuditorBreadcrumb from "../../../../../component/RPMAuditorBreadcrumb";
import AppLayout from "../../../../../layouts/AppLayout";
import { fetchAllDocuments } from "../../../../../store/ducks/RPMAuditor/actions";
import { getAuditorDocuments, getAuditorDocumentsError, getAuditorDocumentsLoading } from "../../../../../store/ducks/RPMAuditor/selectors";
import withAuth from "../../../../routes/hoc/withAuth";

function RPMDocumentHistory(props) {
  return (
    <AppLayout title="RPM" breadcrumb={RPMAuditorBreadcrumb}>
      <TableDocumentHistory {...props} />
    </AppLayout>
  );
}

const mapDispatchToProps = {
  fetchAllDocuments: fetchAllDocuments
}

const mapStateToProps = state => ({
  loading: getAuditorDocumentsLoading(state),
  error: getAuditorDocumentsError(state),
  data: getAuditorDocuments(state)
})

export default compose(
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(RPMDocumentHistory)