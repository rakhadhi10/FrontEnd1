import { compose } from "redux";
import withAddendum from "../../../routes/hoc/withAddendum";
// import { pat_content } from "../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
// import withRole from "../../routes/hoc/withRole";
import PATDocumentReviewer from "./PATDocumentReviewer";

const PATDocument = (props) => <PATDocumentReviewer {...props} />;

export default compose(
  withAuth,
  // withRole(pat_content),
  withPATStatus,
  withAddendum,
)(PATDocument)