import { compose } from "redux";
import AddendumPATBreadcrumb from "../../../../component/AddendumPATBreadcrumb";
import CardMenuList from "../../../../component/PAT/common/PATProject/CardMenuList";
import AppLayout from "../../../../layouts/AppLayout";
import { pat_content } from "../../../routes/allowedRoles";
import withAddendum from "../../../routes/hoc/withAddendum";
import withAuth from "../../../routes/hoc/withAuth";
import withPATStatus from "../../../routes/hoc/withPATStatus";
import withRole from "../../../routes/hoc/withRole";

export function PATProject() {
  return (
    <AppLayout title="ADDENDUM-PAT" addendum={true} breadcrumb={AddendumPATBreadcrumb}>
      <CardMenuList addendum />
    </AppLayout>
  );
}

export default compose(
  withAuth,
  withRole(pat_content),
  withPATStatus,
  withAddendum,
)(PATProject)