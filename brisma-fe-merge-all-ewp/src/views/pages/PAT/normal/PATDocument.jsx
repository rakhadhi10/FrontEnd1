import { compose } from "redux";
// import { pat_content } from "../../routes/allowedRoles";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
// import withRole from "../../routes/hoc/withRole";
import PATDocumentReviewer from "./PATDocumentReviewer";

const PATDocument = (props) => <PATDocumentReviewer {...props} />;

export default compose(
  withAuth,
  withPATStatus,
  // withRole(pat_content),
)(PATDocument)